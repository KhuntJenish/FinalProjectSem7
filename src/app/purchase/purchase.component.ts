import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent {
  date: any | undefined;

  number: number = 1;
  description!: string;
  designNo!: number;
  plain: number = 0;
  work: number = 0;
  qty: number = 0;
  rate: number = 0;
  amount: number = 0;
  totalRawAmount: number = 0;
  discount: number = 0;
  discountPercentage: number = 0;
  grossAmount: number = 0;
  sgst: number = 0;
  cgst: number = 0;
  igst: number = 0;
  totalAmount: number = 0;

  itemData: any[] = [];

  jenish: any[] = ['Kishan', 'Jenish'];
  constructor(public datepipe: DatePipe) {
    this.currentFunction();
    // console.log(this.date);
  }

  currentFunction() {
    this.date = new Date();
    let latest_date = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.date = latest_date;
  }
  // onClickSubmit(data: any) {
  //   // console.log(data);
  //   // console.log(data.no);
  // }

  //add row items in table
  addItems() {
    if (this.description == undefined) {
      alert('Please Enter Description');
      return;
    } else if (this.designNo == undefined) {
      alert('Please Enter designNo');
      return;
    } else if (this.amount == 0) {
      alert('Please Enter amount');
      return;
    }

    let item = {
      number: this.number,
      description: this.description,
      designNo: this.designNo,
      plain: this.plain,
      work: this.work,
      qty: this.qty,
      rate: this.rate,
      amount: this.amount,
    };
    this.itemData.push(item);
    this.totalRawAmountfunc();
    this.number++;
  }

  //totalAmount of all items
  totalRawAmountfunc() {
    this.totalRawAmount = 0;
    this.itemData.forEach((item: any) => {
      this.totalRawAmount += item.amount;
      // console.log(item.amount);
    });
    // console.log(this.totalRawAmount);
  }

  //remove one items of all items
  removeItem() {
    this.itemData.pop();
    this.totalRawAmountfunc();
    this.number--;
  }

  //row item qty set
  qtyChange() {
    this.qty = this.plain + this.work;
    // console.log('qtyChange');
    // console.log(this.qty);
  }

  //row item amount set
  amountchnage() {
    this.amount = this.work * this.rate;
    // console.log('amountChange');
    // console.log(this.amount);
  }
  //discount amount set
  discountChnage() {
    console.log(this.discount);
    this.discountPercentage = this.discount;
    this.discount = (this.totalRawAmount * this.discount) / 100;
    // console.log('discountChange');
    // console.log(this.discount);
    this.grossAmountChnage();
  }
  //gross amount set
  grossAmountChnage() {
    this.grossAmount = this.totalRawAmount - this.discount;
    // console.log('grossAmountChange');
    // console.log(this.grossAmount);
  }
}
