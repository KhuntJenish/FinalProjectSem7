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
  id: any;
  itemData: any[] = [];

  //add row items in table
  addItems(index: any) {
    console.log('addItems called');

    if (this.pname == undefined || this.pname == '') {
      alert('Please Enter pname');
      return;
    } else if (this.aline1 == undefined || this.aline1 == '') {
      alert('Please Enter correct address');
      return;
    } else if (this.type == undefined || this.type == '') {
      alert('Please select type');
      return;
    } else if (this.gstno == undefined || this.gstno.length != 15) {
      alert('Please Enter correct gstno');
      return;
    }
    console.log(this.id);
    if (this.id == undefined) {
      let item = {
        id: this.itemData.length + 1,
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
      console.log(item.id);
      this.id = undefined;
    } else {
      let item = {
        id: this.id,
        pname: this.pname,
        gstno: this.gstno,
        aline1: this.aline1,
        aline2: this.aline2,
        city: this.city,
        pincode: this.pincode,
        state: this.state,
        type: this.type,
      };
      this.itemData[this.id - 1] = item;
      console.log(this.itemData[this.id - 1]);
      console.log(item);
      this.id = undefined;
      // alert('Please select correct id');
    }

    this.pname = '';
    this.gstno = '';
    this.aline1 = '';
    this.aline2 = '';
    this.city = '';
    this.pincode = '';
    this.state = '';
    this.type = '1';
  }

  // delete row items in table
  deleteItems(index: any) {
    console.log('deleteItems called');
    var res = confirm('Are you sure you want to delete?');
    if (res) {
      console.log(index - 1);

      this.itemData.splice(index - 1, 1);
      // alert('Deleted');
    } else {
      alert('Not deleted');
    }
  }
  // Edit row items in table
  editItems(index: any) {
    console.log('EditItems called');
    console.log(index);
    (this.id = index.id),
      (this.pname = index.pname),
      (this.gstno = index.gstno),
      (this.aline1 = index.aline1),
      (this.aline2 = index.aline2),
      (this.city = index.city),
      (this.pincode = index.pincode),
      (this.state = index.state),
      (this.type = index.type);
  }
}
