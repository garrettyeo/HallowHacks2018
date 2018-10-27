import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  title: string = 'homepage';
  provinces: Array<string> = PROVINCES;
  appliances: Array<string> = APPLIANCES;
  energyConsumption: number;
  cost: number =0;
  constructor() { }

  ngOnInit() {
  }

  showValue = (value: number) =>{
    this.energyConsumption = value;
    this.calcCost();
    console.log(value);
  }

  calcCost = () =>{
    let mul = 8.29;
    this.cost = this.energyConsumption * (8.29/100);
  }

  getWidth = () =>{
    return this.energyConsumption/700*100;
  }

}

const PROVINCES = ['BC', 'AB', 'SK', 'MB', 'ON', 'PQ', 'NS', 'NB', 'NL', 'PEI'];
const APPLIANCES = ['Clothes Dryers', 'Clothes Washers', 'Dishwashers', 'Freezers', 'Electric Ranges (Cooktops and Ovens)', 'Refrigerators', 'Air conditioners'];
