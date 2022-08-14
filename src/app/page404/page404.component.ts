import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss']
})
export class Page404Component implements OnInit {

  dataSource: Object;
  
  title = "trial graph"

  // chartData = [
  // {
  //   label : "Venezuela",
  //   value : "10000"
  // },
  // {
  //   label : "Saudi",
  //   value : "260"
  // },
  // {
  //   label : "Canada",
  //   value : "180"
  // },
  // {
  //   label : "Iran",
  //   value : "140"
  // },
  // {
  //   label : "Russia",
  //   value : "115"
  // },
  // {
  //   label : "UAE",
  //   value : "100"
  // },
  // {
  //   label : "US",
  //   value : "30"
  // },
  // {
  //   label : "China",
  //   value : "30"
  // }
  // ]

  chartData = [
{
  label : "Abdul-latif Mohammed",
  value : "67"
},
{
  label : "Emmanuel Brew",
  value : "33"
}
  ]

  // STEP 3 - Chart Configuration
    dataSource1 = {
      chart: {
        "yAxisMaxValue": "100",
        "yAxisMinValue": "0",
        //Set the chart caption
        caption: "Countries With Most Oil Reserves [2017-18]",
        //Set the chart subcaption
        subCaption: "In MMbbl = One Million barrels",
        //Set the x-axis name
        xAxisName: "Country",
        //Set the y-axis name
        yAxisName: "Percentage (%)",
        numberSuffix: "%",
        //Set the theme for your chart
        theme: "fusion"
      },
      // Chart Data - from step 2
      data: this.chartData
    }

  constructor() {
this.dataSource = this.dataSource1;
  }

  ngOnInit(): void {
  }

}
