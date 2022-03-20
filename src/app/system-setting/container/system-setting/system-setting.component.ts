import { formatName } from './../../../shared/utility';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { userSearch } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { SystemSettingService } from '../../system-setting.service';
import { UserAssignedData } from '../../model/user-assigned-data';

@Component({
  selector: 'app-system-setting',
  templateUrl: './system-setting.component.html',
  styleUrls: ['./system-setting.component.css'],
})
export class SystemSettingComponent implements OnInit, OnDestroy {
  regionalDirectorInfo = {
    ['user_id']: '',
    name: '',
  };
  notedByInfo = {
    ['user_id']: '',
    name: '',
  };
  counter = {
    adm: '',
    rox: '',
  };
  positionSelected = '';
  userSelectSub: Subscription;
  formatName = formatName;

  constructor(private systemSettingService: SystemSettingService, private modalService: NgbModal, private authService: AuthService) {}

  ngOnInit(): void {
    this.regionalDirectorInfo = this.systemSettingService.getRegionalDirectorInfo();
    this.notedByInfo = this.systemSettingService.getNotedByInfo();
    this.counter = this.systemSettingService.getFormCounterInfo().reduce((prev, val) => {
      if (val.setting === 'adm_counter') {
        return { ...prev, adm: `${+val.value}` };
      }
      if (val.setting === 'rox_counter') {
        return { ...prev, rox: `${+val.value}` };
      }
    }, this.counter);
    this.userSelectSub = this.authService.selectedEntryUser.subscribe({
      next: (res) => {
        const data: UserAssignedData = { ['user_id']: res.user_id, name: this.formatName(res), position: res.position };

        if (this.positionSelected === 'regional_director') {
          this.saveSelectedRegionalDirector(data);
        } else {
          this.saveSelectedNotedBy(data);
        }
      },
    });
  }

  async saveSelectedRegionalDirector(data: UserAssignedData) {
    try {
      const { data: resData } = await this.systemSettingService.saveRegionalDirector(data);
      this.regionalDirectorInfo.user_id = resData.user_id;
      this.regionalDirectorInfo.name = resData.name;
    } catch (error) {
      console.log(error);
    }
  }

  async saveSelectedNotedBy(data: UserAssignedData) {
    try {
      const { data: resData } = await this.systemSettingService.saveNotedBy(data);
      this.notedByInfo.user_id = resData.user_id;
      this.notedByInfo.name = resData.name;
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    this.userSelectSub.unsubscribe();
  }

  open(inputName: string) {
    this.positionSelected = inputName;
    const modalRef = this.modalService.open(ModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.componentName = userSearch;
  }
}
