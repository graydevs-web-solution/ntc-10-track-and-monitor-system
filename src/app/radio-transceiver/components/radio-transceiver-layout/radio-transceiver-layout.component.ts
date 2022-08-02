import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ADD, EDIT, LIST, VIEW } from 'src/app/shared/constants';
import { RadioTransceiverService } from '../../radio-transceiver.service';

@Component({
  selector: 'app-radio-transceiver-layout',
  templateUrl: './radio-transceiver-layout.component.html',
  styleUrls: ['./radio-transceiver-layout.component.css'],
})
export class RadioTransceiverLayoutComponent implements OnInit {
  url: string;
  type = LIST;

  constructor(private router: Router, private rtService: RadioTransceiverService, private authService: AuthService) {}

  ngOnInit(): void {
    this.rtService.resourceType.subscribe((type) => {
      this.type = type;
    });
  }

  async getURL(): Promise<void> {
    switch (this.type) {
      case ADD:
      case EDIT:
      case VIEW:
        await this.router.navigate(['/radio-transceiver']);
        break;
      default:
        await this.router.navigate(['/']);
        break;
    }
  }

  enableNew(): boolean {
    const allowedUser = ['engr', 'it-admin'];
    return allowedUser.includes(this.authService.getUserInfo().position);
  }
}
