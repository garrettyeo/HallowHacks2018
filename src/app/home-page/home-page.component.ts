import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  title: string = 'Is My Appliance Efficient?';
  provinces: Array<string> = PROVINCES;
  appliances: Array<string> = APPLIANCES;
  energyConsumption: number;
  currentAppliance: any = APPLIANCE_CONSUMPTION[3];
  cost: number = 0;
  constructor() {

  }

  ngOnInit() {
  }

  showValue = (value: number) => {
    this.energyConsumption = value;
    this.calcCost();
    console.log(value);
  }

  calcCost = () => {
    // let mul = 8.29;
    this.cost = this.energyConsumption * (8.29 / 100);
  }

  getWidth = () => {
    return (this.energyConsumption - this.currentAppliance.min) / this.currentAppliance.max * 100;
  }

}

const PROVINCES = ['BC', 'AB', 'SK', 'MB', 'ON', 'PQ', 'NS', 'NB', 'NL', 'PEI'];
const APPLIANCES = ['Clothes Dryers', 'Clothes Washers', 'Dishwashers', 'Freezers', 'Electric Ranges (Cooktops and Ovens)', 'Refrigerators', 'Air conditioners'];
const APPLIANCE_CONSUMPTION = [
  {min: 1, max: 2},
  {min: 1, max: 2},
  {min: 1, max: 2},
  {min: 100, max: 700},
  {min: 1, max: 2},
  {min: 1, max: 2},
  {min: 1, max: 2}
]