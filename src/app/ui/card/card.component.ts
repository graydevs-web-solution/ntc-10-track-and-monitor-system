import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="px-3 py-2 border rounded bg-white mb-2" [ngClass]="{ cursor: cursor, 'text-center': centered }">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input() cursor = false;
  @Input() centered = false;

  constructor() {}

  ngOnInit(): void {}
}
