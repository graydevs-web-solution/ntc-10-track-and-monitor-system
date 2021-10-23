import { ModalComponent } from './../../../ui/modal/modal.component';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../model/user';
import { EDIT, userEdit, users } from 'src/app/shared/constants';
import { formatName } from 'src/app/shared/utility';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-user-entry',
  templateUrl: './user-entry.component.html',
  styleUrls: ['./user-entry.component.css'],
})
export class UserEntryComponent implements OnInit {
  @Input() entry: User;

  formatName = formatName;

  constructor(private modalService: NgbModal, private authService: AuthService) {}

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.formId = this.entry.user_id;
    modalRef.componentInstance.componentName = userEdit;
    modalRef.componentInstance.formMode = EDIT;
    modalRef.shown.subscribe({
      next: () => {
        this.authService.selectedEntry.next(this.entry);
      },
    });
  }

  position(data: User) {
    switch (data.position) {
      case 'engr':
        return 'Engineer';
      case 'chf-engr':
        return 'Chief Engineer';
      case 'legal':
        return 'Legal';
      case 'director':
        return 'Director';
      default:
        return 'IT Admin';
    }
  }

  ngOnInit(): void {}
}
