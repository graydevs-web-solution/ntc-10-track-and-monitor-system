import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ADD, EDIT } from 'src/app/shared/constants';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  form?: FormGroup;
  formMode = ADD;
  formId = '';
  userTypes = this.authService.getUserTypes();

  alert = {
    type: '',
    description: '',
  };
  disableDuringProcess = false;

  getDestroyed = new Subject();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.authService.initForm();

    this.authService.saveUserListener.pipe(takeUntil(this.getDestroyed)).subscribe({
      next: () => {
        this.submit();
      },
    });

    this.authService.selectedEntry.pipe(takeUntil(this.getDestroyed)).subscribe({
      next: (data) => {
        this.formMode = EDIT;
        this.formId = data.user_id;
        this.form.patchValue({ ...data });
      },
    });
  }

  ngOnDestroy(): void {
    this.getDestroyed.next();
    this.getDestroyed.complete();
  }

  async submit() {
    try {
      this.authService.disableDuringProcess.next(true);
      this.alert.description = 'Saving user...';
      this.alert.type = 'info';

      if (this.formMode === ADD) {
        this.authService
          .addOne(this.form.value)
          .pipe(takeUntil(this.getDestroyed))
          .subscribe({
            next: () => {
              this.form.reset();
              this.authService.disableDuringProcess.next(false);
              this.authService.getEntriesAPI();
              this.alert.type = 'success';
              this.alert.description = 'User created successfully';
              setTimeout(() => {
                this.alert.type = '';
                this.alert.description = '';
              });
            },
            error: (error) => {
              this.authService.disableDuringProcess.next(false);
              if (error?.message) {
                this.alert.type = 'danger';
                this.alert.description = 'Error server.';
                return;
              }
              this.alert.type = 'danger';
              this.alert.description = 'Unknown server error.';
            },
          });
      } else {
        this.authService
          .updateOne(this.formId, this.form.value)
          .pipe(takeUntil(this.getDestroyed))
          .subscribe({
            next: () => {
              console.log('OK');
            },
            error: (error) => {
              console.log(error);
            },
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
