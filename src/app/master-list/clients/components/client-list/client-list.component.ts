import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Client } from '../../models/client.model';

@Component({
  selector: 'app-client-list',
  template: `
    <app-card *ngFor="let entry of entries" class="cursor-pointer">
      <app-client-entry [entry]="entry"></app-client-entry>
    </app-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent implements OnInit {
  @Input() entries: Client[];
  constructor() {}

  ngOnInit(): void {}
}
