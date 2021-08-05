import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
