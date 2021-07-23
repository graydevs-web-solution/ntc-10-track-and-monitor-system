import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-station-collection',
  templateUrl: './station-collection.component.html',
  styleUrls: ['./station-collection.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StationCollectionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
