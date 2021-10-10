import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-navbar-item',
  templateUrl: './side-navbar-item.component.html',
  styleUrls: ['./side-navbar-item.component.css'],
})
export class SideNavbarItemComponent implements OnInit {
  @Input() icon: IconDefinition = faCircle;
  @Input() mask: IconDefinition = faCircle;
  @Input() label = '';
  @Input() currentlySelected = false;
  @Output() clicked = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  clickedFn(): void {
    this.clicked.next();
  }
}
