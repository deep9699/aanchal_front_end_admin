import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from "@angular/material";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";
import { Chart } from 'chart.js';
import { DashboardService } from "../Services/dashboard.service";
import { animation } from '@angular/animations';
import { OrderService } from "../order.service";
import { timer } from "rxjs";
import { ProductService } from '../Services/product.service';
import { product } from '../classes/product_class';
export class OrderTableDetais
{
  constructor(
    public Order_id:number,
    public Fk_stock_id:number,
    public Fk_customer_id:number,
    public Quantity:number,
    public Status:string,
    public Color_name:string,
    public Size_name:string,
    public Product_name:string,
    public Product_price:number,

  ){}
}

export class StockTableDetais
{
  constructor(
    public Quantity:number,
    public Color_name:string,
    public Size_name:string,
    public Product_name:string,
    public Product_price:number,
    public Supplier_name:string
  ){}
}
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
  pie_data:number[]=[0,0,0,0,0];
  weekchart: number[] = [];
  i: number;
  pie_tot:number=0;
  customer_order_table:OrderTableDetais[]=[]
  customer_order_dataSource=new MatTableDataSource();
  @ViewChild(MatSort) order_sort: MatSort;
  order_pageEvent: PageEvent;
  order_displayedColumns: string[] = ['Product_name','Color_name', 'Size_name','Quantity','Price'];

  stock_table:StockTableDetais[]=[]
  stock_dataSource=new MatTableDataSource();
  @ViewChild('stockPaginator', {read: MatPaginator}) stock_paginator: MatPaginator;
  @ViewChild('orderPaginator', {read: MatPaginator}) order_paginator: MatPaginator;
  @ViewChild(MatSort) stock_sort: MatSort;
  stock_pageEvent: PageEvent;
  stock_displayedColumns: string[] = ['Supplier_name','Product_name','Color_name', 'Size_name','Price','Quantity'];

  pie_name:string[]=['top1','top2','top3','top4','top5'];
  top_pro:product[]=[];

  LineChart = [];
  BarChart = [];
  PieChart=[];
  myPieChart=[];


  postsSubscription:any;
  timespan:any;

  constructor(private _ser: DashboardService,private order_ser:OrderService,private pro_ser:ProductService) { }

  ngOnInit() {
        this.refreshData();
        this.refreshDatachart();
    //order pageinator
    this.customer_order_dataSource.paginator=this.order_paginator;
    this.customer_order_dataSource.sort=this.order_sort;

    //stock paginator
    this.stock_dataSource.paginator=this.stock_paginator;
    this.stock_dataSource.sort=this.stock_sort;




    this.pro_ser.getTopSellingProduct().subscribe(
      (data:any)=>
      {
        this.top_pro=data;
        console.log(this.top_pro);
        for(this.i=0;this.i<data.length;this.i++)
        {
          this.pie_tot+=data[this.i].total;
        }        
        if(this.i==this.top_pro.length)
        {
         for(let x=0;x<this.top_pro.length;x++)
         {  
           this.pie_data[x]=parseInt((((data[x].total*100)/this.pie_tot)+""));
           this.pie_name[x]=this.top_pro[x].Product_name;
         }
        }
        console.log(this.pie_data);
      }
      
    );




  }



  private subscribeToData(): void {
        this.timespan = timer(10000)
        .subscribe(() => this.refreshData());
  }

  private subscribeToDataforchart(): void {
    this.timespan = timer(30000)
    .subscribe(() => this.refreshDatachart());
}

private refreshDatachart(): void {

  this.subscribeToDataforchart();


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

    //console.log(this.online_customer);


   ///piechart
   this.PieChart = new Chart('piechart', {
    type: 'pie',
    data: {
      labels: this.pie_name,
      datasets: [{
        label: "",
        backgroundColor:["rgb(251,149,13)","rgb(252,2,128)","rgb(11,180,200)","rgb(93,180,97)","orchid"],
        data: this.pie_data,
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




}


  private refreshData(): void {

    this.subscribeToData();


     //online-offline customer
     this._ser.getOnlineCustomer().subscribe(
      (data: any) => {
        console.log(data);
        this.online_customer[0] = data[0].Total;
        this.offline_customer[0]=data[1].Total;
        console.log(this.online_customer);

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


    //order details
    this.order_ser.getAllOrder().subscribe(
      (data:OrderTableDetais[])=>
      {
        console.log(data);
        this.customer_order_table=data;
         this.customer_order_dataSource.data=this.customer_order_table;
         console.log(this.customer_order_dataSource.data);

      }
    );

    //stock details
    this._ser.getStockDetails().subscribe(
      (data:any)=>
      {
        console.log(data);
        this.stock_table=data;
         this.stock_dataSource.data=this.stock_table;
         console.log(this.stock_dataSource.data);

      }
    );










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