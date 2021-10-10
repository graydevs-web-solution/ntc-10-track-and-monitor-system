import { Component, Input, OnInit } from '@angular/core';
import { Complaint } from '../../models/complaint.model';

@Component({
  selector: 'app-complaint-list',
  template: `
    <app-card *ngFor="let entry of entries">
      <app-complaint-entry [entry]="entry"></app-complaint-entry>
    </app-card>
  `,
  styleUrls: ['./complaint-list.component.css'],
})
export class ComplaintListComponent implements OnInit {
  @Input() entries: Complaint[];

  constructor() {}

  ngOnInit(): void {}
}
