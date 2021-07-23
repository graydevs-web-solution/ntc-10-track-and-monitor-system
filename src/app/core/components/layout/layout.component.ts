import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StationService } from 'src/app/master-list/station/station.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
