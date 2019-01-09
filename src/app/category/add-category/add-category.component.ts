import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../Services/category.service';
import { category } from '../../classes/category_class';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef} from '@angular/material';
import { CategoryHomeComponent } from '../category-home/category-home.component';


@Component({
  selector: 'add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category_list:category[]=[];
  Category_name:string;
  flag:boolean=false;
  i:number;
  constructor(private cat_ser:CategoryService,private _router:Router,private matDialog:MatDialogRef<CategoryHomeComponent>,private _act:ActivatedRoute) {  }

  onclickAdd()
  {
    console.log("xyz");
    this.cat_ser.addCategory(new category(this.Category_name)).subscribe(
      (data:any)=>
      {
        console.log(data);
       // this._router.navigate(['menu/category_home']);
      //  this.currentdialog.close();
        this.matDialog.close();
      }
    );
  }

  onclickCancle()
  {
    this._router.navigate(['menu/category_home']);

  }

  ngOnInit() {
    this.cat_ser.getAllCategory().subscribe(
      (data:category[])=>
      {
        this.category_list=data;
      }
    );
    }
  }
