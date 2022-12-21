import { Component, OnInit } from '@angular/core';
import { NetworkApiService } from 'app/network-api.service';

@Component({
  selector: 'app-party-account',
  templateUrl: './party-account.component.html',
  styleUrls: ['./party-account.component.css'],
})
export class PartyAccountComponent implements OnInit {
  constructor(private _apiService: NetworkApiService) {}
  pname: string = '';
  gstno: string = '';
  aline1: string = '';
  aline2: string = '';
  city: string = '';
  pincode: string | number = '';
  state: string = '';
  type: string = 'default';
  id: any;
  itemData: any[] = [];
  isEdit: boolean = false;
  editID: number = 0;
  ngOnInit() {
    this.makeNull();
    this.getPartyData();
  }
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
    const item = new partyData();
    item.aline1 = this.aline1;
    item.aline2 = this.aline2;
    item.city = this.city;
    item.gstno = this.gstno;
    // item.inStockTb;
    item.pName = this.pname;
    // item.paId = this.
    item.pincode = +this.pincode;
    // item.purchaseBillTb;
    // item.saleBillTb;
    item.stateCountry = this.state;
    item.type = this.type;
    if (this.isEdit) {
      item.paId = this.editID;
      this._apiService.updateParty(this.editID, item).subscribe((res: any) => {
        console.log('Data is updated');
        this.editID = 0;
        this.isEdit = false;
        this.getPartyData();
      });
    } else {
      this._apiService.postParty(item).subscribe((res: any) => {
        console.log('Data is submitted');
        this.getPartyData();
      });
    }
    // if (this.id == undefined) {
    //   let item = {
    //     id: this.itemData.length + 1,
    //     pname: this.pname,
    //     gstno: this.gstno,
    //     aline1: this.aline1,
    //     aline2: this.aline2,
    //     city: this.city,
    //     pincode: this.pincode,
    //     state: this.state,
    //     type: this.type,
    //   };
    //   this.itemData.push(item);
    //   localStorage.setItem('itemData', JSON.stringify(this.itemData));
    //   console.log(this.itemData);
    //   console.log(item.id);
    //   this.id = undefined;
    // } else {
    //   let item = {
    //     id: this.id,
    //     pname: this.pname,
    //     gstno: this.gstno,
    //     aline1: this.aline1,
    //     aline2: this.aline2,
    //     city: this.city,
    //     pincode: this.pincode,
    //     state: this.state,
    //     type: this.type,
    //   };
    //   this.itemData[this.id - 1] = item;
    //   console.log(this.itemData[this.id - 1]);
    //   console.log(item);
    //   this.id = undefined;
    //   // alert('Please select correct id');
    // }

    this.makeNull();
  }

  // delete row items in table
  deleteItems(index: any) {
    console.log('deleteItems called');
    var res = confirm('Are you sure you want to delete?');
    if (res) {
      this._apiService.deleteParty(index).subscribe((res) => {
        console.log('Data is submitted');
        this.getPartyData();
      });

      // console.log(index - 1);

      // this.itemData.splice(index - 1, 1);
      // alert('Deleted');
    } else {
      alert('Not deleted');
    }
  }
  // Edit row items in table
  editItems(index: any) {
    this.isEdit = true;
    this.editID = index.paId;
    console.log('EditItems called');
    console.log(index);

    this.id = index.id;
    this.pname = index.pName;
    this.gstno = index.gstno;
    this.aline1 = index.aline1;
    this.aline2 = index.aline2;
    this.city = index.city;
    this.pincode = index.pincode;
    this.state = index.state;
    this.type = index.type;
  }
  getPartyData() {
    this._apiService.getParty().subscribe((data: any) => {
      const res = JSON.parse(JSON.stringify(data));
      console.log(res);
      this.itemData = res;
    });
  }
  makeNull() {
    this.id = 0;
    this.pname = '';
    this.gstno = '';
    this.aline1 = '';
    this.aline2 = '';
    this.city = '';
    this.pincode = 0;
    this.state = '';
    this.type = 'default';
  }
}

export class partyData {
  aline1?: any;
  aline2?: any;
  city?: any;
  gstno?: any;
  inStockTb?: any;
  pName?: any;
  paId?: any;
  pincode?: any;
  purchaseBillTb?: any;
  saleBillTb?: any;
  stateCountry?: any;
  type?: any;
}
