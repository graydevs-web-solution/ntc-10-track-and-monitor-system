import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';

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

  private signaturePadOptions = {
    canvasWidth: 360,
    canvasHeight: 240,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  };

  constructor() {}

  ngOnInit(): void {
    //
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
    this.base64Png = this.signPad.toDataURL();
    const res = await fetch(this.base64Png);
    const blobImage = await res.blob();
    console.log({ blobImage });

    const reader = new FileReader();
    reader.readAsDataURL(blobImage);
    reader.onloadend = () => {
      const base64data = reader.result;
      this.sampleImage = base64data as string;
    };
  }
}
