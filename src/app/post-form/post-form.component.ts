import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  provinces: Array<string> = PROVINCES;
  appliances: Array<string> = APPLIANCES;
  inputFirstName: string;
  inputLastName: string;
  inputEmail: string;
  inputPhone: string;
  inputAddress: string;
  inputCity: string;
  inputZip: string;
  inputComment: string;
  inputProvince: string;

  model = () => {
    console.log(this.inputFirstName);
    console.log(this.inputLastName);
    console.log(this.inputEmail);
    console.log(this.inputPhone);
    console.log(this.inputAddress);
    console.log(this.inputCity);
    console.log(this.inputZip);
    console.log(this.inputComment);
    console.log(this.inputProvince);
  }

  constructor() { }

  ngOnInit() {
  }

}

const PROVINCES = ['BC', 'AB', 'SK', 'MB', 'ON', 'PQ', 'NS', 'NB', 'NL', 'PEI'];
const APPLIANCES = ['Clothes Dryers', 'Clothes Washers', 'Dishwashers', 'Freezers', 'Electric Ranges (Cooktops and Ovens)', 'Refrigerators', 'Air conditioners'];
