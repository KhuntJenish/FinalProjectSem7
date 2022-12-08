import { Component } from '@angular/core';

@Component({
  selector: 'app-party-account',
  templateUrl: './party-account.component.html',
  styleUrls: ['./party-account.component.css'],
})
export class PartyAccountComponent {
  pname: string = '';
  gstno: string = '';
  aline1: string = '';
  aline2: string = '';
  city: string = '';
  pincode: string = '';
  state: string = '';
  type: string = '1';
  itemData: any[] = [];

  //add row items in table
  addItems() {
    console.log('addItems called');
    if (this.pname == undefined) {
      alert('Please Enter pname');
      return;
    } else if (this.aline1 == undefined) {
      alert('Please Enter adress');
      return;
    } else if (this.type == undefined) {
      alert('Please select type');
      return;
    }

    let item = {
      pname: this.pname,
      gstno: this.gstno,
      aline1: this.aline1,
      aline2: this.aline2,
      city: this.city,
      pincode: this.pincode,
      state: this.state,
      type: this.type,
    };
    this.itemData.push(item);
    localStorage.setItem('itemData', JSON.stringify(this.itemData));
    console.log(this.itemData);
    this.pname = '';
    this.gstno = '';
    this.aline1 = '';
    this.aline2 = '';
    this.city = '';
    this.pincode = '';
    this.state = '';
    this.type = '1';
    
  }
}
