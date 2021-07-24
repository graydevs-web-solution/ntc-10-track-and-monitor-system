import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { EDIT, serviceCenterEdit } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { ServiceCenter } from '../../models/service-center.model';
import { ServiceCenterService } from '../../service-center.service';

@Component({
  selector: 'app-service-center-collection',
  templateUrl: './service-center-collection.component.html',
  styleUrls: ['./service-center-collection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCenterCollectionComponent implements OnInit, OnDestroy {
  entries: ServiceCenter[] = [];
  entriesSubs: Subscription;
  constructor(private modalService: NgbModal, private serviceCenterService: ServiceCenterService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.entries = this.serviceCenterService.getEntries();
    this.entriesSubs = this.serviceCenterService.getEntriesListener().subscribe({
      next: (value) => {
        this.entries = value;
        this.cd.detectChanges();
      },
    });
  }

  ngOnDestroy(): void {
    this.entriesSubs.unsubscribe();
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.componentName = serviceCenterEdit;
    modalRef.componentInstance.formMode = EDIT;
  }
}
