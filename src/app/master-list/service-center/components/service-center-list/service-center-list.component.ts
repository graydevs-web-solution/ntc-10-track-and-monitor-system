import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ServiceCenter } from '../../models/service-center.model';

@Component({
  selector: 'app-service-center-list',
  template: `
    <app-card *ngFor="let entry of entries">
      <app-service-center-entry [entry]="entry"></app-service-center-entry>
    </app-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceCenterListComponent implements OnInit {
  @Input() entries: ServiceCenter[];
  constructor() {}

  ngOnInit(): void {}
}
