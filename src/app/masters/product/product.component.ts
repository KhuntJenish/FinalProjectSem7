import { Component, OnInit } from '@angular/core';
import { NetworkApiService } from 'app/network-api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(private _apiService: NetworkApiService) {}
  pname: string = '';
  cgst: number = 0;
  sgst: number = 0;
  igst: number = 0;
  type: string = 'Saree';
  id: any;
  itemData: any[] = [];
  isEdit: boolean = false;
  editID: number = 0;

  ngOnInit(): void {
    this.getItemData();
  }

  onSelected(value: string): void {
    this.type = value;
    console.log(this.type);
  }

  addItems(index: any) {
    // console.log('addItems called');

    if (this.pname == undefined || this.pname == '') {
      alert('Please Enter pname');
      return;
    } else if (this.type == undefined || this.type == '') {
      alert('Please select type');
      return;
    }
    const item = new embData();
    item.name = this.pname;
    item.cgst = +this.cgst;
    item.sgst = +this.sgst;
    item.igst = +this.igst;
    item.type = this.type;

    if (this.isEdit) {
      item.pdId = this.editID;
      this._apiService.updateConfig(this.editID, item).subscribe((res: any) => {
        console.log('Data is updated');
        this.editID = 0;
        this.isEdit = false;
        this.getItemData();
      });
    } else {
      this._apiService.postConfig(item).subscribe((res: any) => {
        console.log('Data is submitted');
        this.getItemData();
      });
    }

    // console.log(this.id);
    // if (this.id == undefined) {
    //   let item = {
    //     id: this.itemData.length + 1,
    //     pname: this.pname,
    //     cgst: this.cgst,
    //     sgst: this.sgst,
    //     igst: this.igst,
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
    //     cgst: this.cgst,
    //     sgst: this.sgst,
    //     igst: this.igst,
    //     type: this.type,
    //   };
    //   this.itemData[this.id - 1] = item;
    //   console.log(this.type);
    //   console.log(this.itemData[this.id - 1]);
    //   console.log(item);
    //   this.id = undefined;
    //   // alert('Please select correct id');
    // }

    // this.pname = '';
    // this.cgst = 0;
    // this.sgst = 0;
    // this.igst = 0;
    // this.type = '1';
  }

  // Edit row items in table
  editItems(index: any) {
    console.log(index)
    this.isEdit = true;
    this.editID = index.pdId;
    console.log('EditItems called');
    console.log(index);
    (this.id = index.id),
      (this.pname = index.name),
      (this.cgst = index.cgst),
      (this.igst = index.igst),
      (this.sgst = index.sgst),
      (this.type = index.type);
  }

  // delete row items in table
  deleteItems(index: any) {
    console.log('deleteItems called');
    var res = confirm('Are you sure you want to delete?');
    if (res) {
      this._apiService.deleteConfig(index).subscribe((res:any)=>{
      console.log('data deleted');
      this.getItemData();
        
      });
      console.log(index - 1);

      this.itemData.splice(index - 1, 1);
      // alert('Deleted');
    } else {
      alert('Not deleted');
    }
  }

  getItemData() {
    this._apiService.getConfig().subscribe((data: any) => {
      const res = JSON.parse(JSON.stringify(data));
      console.log(res);
      this.itemData = res;
    });
  }
}

export class embData {
  pdId?:number;
  cgst?: number;
  igst?: number;
  name?: string;
  sgst?: number;
  type?: string;
}
