import { Component, OnInit } from '@angular/core';
import { House } from '../../models/house';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public house!: House;
  public house2!: House;
  constructor() {}

  ngOnInit(): void {}

  getObject(event: House) {
    this.house = event;
  }

  getObject2(event: House) {
    this.house2 = event;
  }
}
