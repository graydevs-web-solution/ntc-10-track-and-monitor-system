import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @Input() entries: User[];
  constructor() {}

  ngOnInit(): void {}
}
