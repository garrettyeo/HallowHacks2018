import { Component, OnInit } from '@angular/core';
import Quagga from 'quagga';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  title: string = 'Are My Appliances Efficient?';
  provinces: Array<string> = PROVINCES;
  appliances: Array<string> = APPLIANCES;
  energyConsumption: number;
  currentAppliance: any;
  cost: number = 0;
  barcodeFound: number;
  curYear: number = 2018;
  applianceSelected: string = "Appliance";

  constructor() {

  }

  ngOnInit() {
  }

  startScanner = () => {
    let scannerIsRunning: any = false;
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanner-container'),
        constraints: {
          width: 365,
          height: 300,
          facingMode: "environment"
        },
      },
      decoder: {
        readers: [
          "ean_reader"
        ], debug: {
          showCanvas: true,
          showPatches: true,
          showFoundPatches: true,
          showSkeleton: true,
          showLabels: true,
          showPatchLabels: true,
          showRemainingPatchLabels: true,
          boxFromPatches: {
            showTransformed: true,
            showTransformedBox: true,
            showBB: true
          }
        }
      },

    }, function (err) {
      if (err) {
        console.log(err);
        return
      }

      console.log("Initialization finished. Ready to start");
      Quagga.start();

      // Set flag to is running
      scannerIsRunning = true;
    });

    Quagga.onProcessed(function (result) {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
          result.boxes.filter(function (box) {
            return box !== result.box;
          }).forEach(function (box) {
            Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
          });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
        }
      }
    });

    Quagga.onDetected(function (result) {
      let barcode = document.getElementById("barcode-found");
      if (result.codeResult.code.toString().length == 13) {
        Quagga.enable = false;
        Quagga.stop();
        barcode.innerHTML = "Barcode Found: " + result.codeResult.code;
      }
    });

  }

  cameraOff = () => {
    Quagga.stop();
    document.getElementById("barcode-found").innerHTML = "Barcode Found:";
    this.selectAppliance('Refrigerator', 5);
    this.energyConsumption = 620;
    this.calcCost();
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
    return (this.energyConsumption - this.currentAppliance.min) / (this.currentAppliance.max - this.currentAppliance.min) * 100;
  }

  selectAppliance = (appliance: string, index: number) => {
    this.applianceSelected = appliance;
    this.currentAppliance = APPLIANCE_CONSUMPTION[index];
  }

}

const PROVINCES = ['BC', 'AB', 'SK', 'MB', 'ON', 'PQ', 'NS', 'NB', 'NL', 'PEI'];
const APPLIANCES = ['Clothes Dryers', 'Clothes Washers', 'Dishwashers', 'Freezers', 'Electric Ranges', 'Refrigerators'];
const APPLIANCE_CONSUMPTION = [
  { min: 721, max: 1280, average: 928 },
  { min: 198, max: 354, average: 217 },
  { min: 300, max: 484, average: 310 },
  { min: 256, max: 621, average: 365 },
  { min: 481, max: 683, average: 522 },
  { min: 491, max: 703, average: 425 }
]