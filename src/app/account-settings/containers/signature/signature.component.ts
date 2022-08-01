import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/model/user';
import { UserAuthenticated } from 'src/app/auth/model/user-authenticated';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css'],
})
export class SignatureComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sPad', { static: false }) signaturePadElement: ElementRef;
  signPad: SignaturePad;
  base64Png = '';
  sampleImage = '';
  user: Partial<UserAuthenticated>;

  private signaturePadOptions = {
    canvasWidth: 360,
    canvasHeight: 240,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  };

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    try {
      const user = this.authService.getUserInfo();
      this.user = user;
      this.getSignature();
    } catch (error) {
      console.error(error);
    }
  }

  ngAfterViewInit(): void {
    this.signPad = new SignaturePad(this.signaturePadElement.nativeElement, this.signaturePadOptions);
  }

  ngOnDestroy(): void {
    //
  }

  clearSignature() {
    this.signPad.clear();
  }

  async save() {
    try {
      this.base64Png = this.signPad.toDataURL();
      const res = await fetch(this.base64Png);
      const blobImage = await res.blob();
      console.log({ blobImage });

      const reader = new FileReader();
      reader.readAsDataURL(blobImage);
      reader.onloadend = async () => {
        const base64data = reader.result;
        this.sampleImage = base64data as string;
        const payload: User = {
          ['user_id']: this.user.user_id,
          signature: base64data as string,
        };
        await this.authService.saveSignature(payload).toPromise();
        await this.getSignature();
      };
      reader.onerror = (error) => {
        console.error(error);
      };
    } catch (error) {
      console.error(error);
    }
  }

  async getSignature() {
    const response = await this.authService.getSignature(this.user.user_id).toPromise();
    this.signPad.fromDataURL(response.signature, { ratio: 1, width: 400, height: 200, xOffset: 0, yOffset: 0 });
  }
}
