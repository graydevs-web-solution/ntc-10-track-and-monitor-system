import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ADD, EDIT, LIST, VIEW } from 'src/app/shared/constants';
import { RadioTransceiverService } from '../../radio-transceiver.service';

@Component({
  selector: 'app-radio-transceiver-layout',
  templateUrl: './radio-transceiver-layout.component.html',
  styleUrls: ['./radio-transceiver-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioTransceiverLayoutComponent implements OnInit {
  url: string;
  type = LIST;

  constructor(private router: Router, private rtService: RadioTransceiverService) {}

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
}
