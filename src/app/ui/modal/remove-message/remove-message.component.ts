import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-remove-message',
  template: `
    <p><strong>Are you sure you want to remove this entry?</strong></p>
    <p><span class="text-danger">This operation can not be undone.</span></p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveMessageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
