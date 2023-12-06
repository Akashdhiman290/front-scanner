import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ApiService } from '../sevice/api.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  data: any = [];
  show = true
  constructor(private service: ApiService) {
    // this.getData('VIG971229531')
   }


  startScan = async () => {
    // Check camera permission
    // This is just a simple example, check out the better checks below
   let permission = await BarcodeScanner.checkPermission({ force: true });
    document.body.style.opacity = '0';
    document.body.style.background = 'transparent';
    (window.document as any).querySelector('ion-app').classList.add('transparentBody')

    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    // BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      document.body.style.opacity = '1';
      document.body.style.background = '';
      (window.document as any).querySelector('ion-app').classList.remove('transparentBody')
      console.log(result.content); // log the raw scanned content
      this.getData(result.content)
    }
  };

  getData(code: any): void {
    this.service.getData(code)
      .subscribe((result: any) => {
        if(result.data.length === 0) {
          alert('No entries found')
        }
        this.data = result.data
      })
  }


}
