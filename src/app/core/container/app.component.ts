import { Component } from '@angular/core';
import { CoreService } from '../service/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isAuthenticate = true;

  constructor(public coreService: CoreService) {}
}
