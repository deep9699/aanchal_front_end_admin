import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DashboardService } from "../Services/dashboard.service";
import { animation } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  online_customer: number[]=[];
  offline_customer: number[]=[];
  total_employee: number;
  total_supplier: number;
  weekchart: number[] = [];
  i: number;

  LineChart = [];
  BarChart = [];
  PieChart=[];
  myPieChart=[];
  constructor(private _ser: DashboardService) { }

  ngOnInit() {


     //online-offline customer
     this._ser.getOnlineCustomer().subscribe(
      (data: any) => {
        this.online_customer[0] = data[1].Total;
        this.offline_customer[0] = data[0].Total;
        console.log(this.online_customer);
        console.log(this.offline_customer);
      }
    );

    //total employee
    this._ser.getTotalEmployee().subscribe(
      (data: any) => {

        console.log(data);
        this.total_employee = data[0].Total_Emp;
        console.log(this.total_employee);

      }
    );

    //total supplier
    this._ser.getTotalSupplier().subscribe(
      (data: any) => {
        this.total_supplier = data[0].Total_sup;
        console.log(this.total_supplier);
      }
    );

    //weekchartdetails
    this._ser.getWeekchartDetails().subscribe(
      (data: any) => {
        console.log(data);
        console.log(data[0].Total_amount);
        for (this.i = 0; this.i < data.length; this.i++) {
          this.weekchart[this.i] = data[this.i].Total_amount;
        }
        console.log(this.weekchart);
      }
    );
    console.log(this.weekchart);

    //linchart
    this.LineChart = new Chart('linechart', {
      type: 'line',
      data: {
        labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        datasets: [{
          label: "Selling amount per day",
          data: this.weekchart,
          fill: true,
          lineTension: 0.2,
          borderColor: "white",
          //backgroundColor:"blue",
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "Line Chart",
          display: true,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        animations:
        {
          animationScale:true
        }
      }
    });

    console.log(this.online_customer);
    //barchart
    this.BarChart = new Chart('barchart', {
      type: 'bar',
      data: {
        labels: ["2008", "2009", "2010", "2011", "2012", "2013", "2014"],
        datasets: [{
          label: "Online Users",
          data: this.online_customer,
          fill: true,
          lineTension: 0.2,
          borderColor: "white",
          //backgroundColor:"blue",
          borderWidth: 1
        },
        {
          label: "Offline Users",
          data: this.offline_customer,
          fill: true,
          lineTension: 0.2,
          borderColor: "white",
          //backgroundColor:"blue",
          borderWidth: 1

        }],

      },
      options: {
        title: {
          text: "Bar Chart",
          display: true,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        animations:
        {
          animationScale:true
        }
      }
    });


    ///piechart
    this.PieChart = new Chart('piechart', {
      type: 'pie',
      data: {
        labels: ["top1","top2","top3","top4","top5"],
        datasets: [{
          label: "",
          backgroundColor:["rgb(251,149,13)","rgb(252,2,128)","rgb(11,180,200)","rgb(93,180,97)","rgb(232,64,60)"],
          data: [70,20,30,40,60],
          fill: true,
          lineTension: 0.2,
          borderColor: "white",
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "Pie Chart",
          display: true,
        }, 
        animations:
        {
          animationScale:true
        }
      }
    });


    
   
  }

  // public barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  // public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  // public barChartType = 'bar';
  // public barChartLegend = true;
  // public barChartData = [
  //   {data: [this.weekchart], label: 'Series A'},
  //   {data: [this.weekchart], label: 'Series B'}
  // ];


}


