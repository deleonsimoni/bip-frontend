import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-time-sheet',
  templateUrl: './user-time-sheet.component.html',
  styleUrls: ['./user-time-sheet.component.scss']
})
export class UserTimeSheetComponent implements OnInit {

  constructor() { }

  days = [];
  currentDate = new Date();


  ngOnInit(): void {
    this.currentDate = new Date();

    let date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    while (date.getMonth() === this.currentDate.getMonth()) {
      let day = {date: new Date(date)};
      this.days.push(day);
      date.setDate(date.getDate() + 1);
    }
    
  }

  dateChanged(newDate) {
    this.currentDate= new Date(newDate);
    console.log(this.currentDate); // <-- for testing
  }

}
