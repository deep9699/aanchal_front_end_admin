import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../Services/category.service';
import { category } from '../../classes/category_class';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  category_id:number;
  category1:category;
  Category_name:String;
  flag:boolean=false;
  i:number;
  constructor(private cat_ser:CategoryService,private _router:Router,private _act:ActivatedRoute) { }

  onclickUpdate()
  {
    console.log("xyz");
    this.cat_ser.updateCategory(new category(this.category1.Category_id,this.Category_name)).subscribe(
      (data:any)=>
      {
        console.log(data);
        alert("category updated");
        this._router.navigate(['category_home']);
      }
    );
  }

  onclickCancle()
  {
    this._router.navigate(['category_home']);
  }

  ngOnInit() {
    this.category_id=this._act.snapshot.params["id"];
    this.cat_ser.getCategoryById(this.category_id).subscribe(
      (data:category[])=>
      {
        this.category1=data[0];
        this.Category_name=this.category1.Category_name;
        console.log(this.Category_name);
      }
    );
  }


}
