import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../Services/category.service';
import { category } from '../../classes/category_class';
import { Router } from '@angular/router';

@Component({
  selector: 'add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category_arr:category[]=[];
  Category_name:string;
  flag:boolean=false;
  i:number;
  constructor(private cat_ser:CategoryService,private _router:Router) { }

  onclickAdd()
  {
    console.log("xyz");
    this.cat_ser.addCategory(new category(0,this.Category_name)).subscribe(
      (data:any)=>
      {
        console.log(data);
      }
    );
  }

  onclickCancle()
  {
    this._router.navigate(['category_home']);
  }

  ngOnInit() {
    this.cat_ser.getAllCategory().subscribe(
      (data:category[])=>
      {
        this.category_arr=data;
      }
    );
  }

}
