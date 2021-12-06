import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ADD, EDIT, LIST, userEdit, VIEW } from 'src/app/shared/constants';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
})
export class AuthLayoutComponent implements OnInit {
  url: string;
  type = LIST;
  constructor(private router: Router, private authService: AuthService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.authService.resourceType.subscribe((type) => {
      this.type = type;
    });
  }

  async getURL(): Promise<void> {
    switch (this.type) {
      case ADD:
      case EDIT:
      case VIEW:
        await this.router.navigate(['/users']);
        break;
      default:
        await this.router.navigate(['/']);
        break;
    }
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true, size: 'lg' });
    modalRef.componentInstance.componentName = userEdit;
    modalRef.componentInstance.formMode = ADD;
  }
}
