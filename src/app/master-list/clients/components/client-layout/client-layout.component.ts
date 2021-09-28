import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { clientEdit, EDIT } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { ClientService } from '../../client.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientLayoutComponent implements OnInit {
  url: string;
  constructor(private clientService: ClientService, private modalService: NgbModal) {}

  ngOnInit(): void {}

  getURL() {
    this.url = '/';
    return this.url;
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.componentName = clientEdit;
    modalRef.componentInstance.formMode = EDIT;
  }
}
