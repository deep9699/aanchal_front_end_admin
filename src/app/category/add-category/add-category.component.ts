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
  Category_arr:string[]=[];
  i:number;
  constructor(private cat_ser:CategoryService,private _router:Router,private matDialog:MatDialogRef<CategoryHomeComponent>,private _act:ActivatedRoute) {  }

  onclickAdd()
  {
   // console.log("xyz");
   //this.flag=true;
    if(this.flag==true)
    {

      this.cat_ser.addCategory(new category(this.Category_name)).subscribe(
        (data:any)=>
        {
          if(data.errno==1062)
          {
            alert('Category already exits');
          }
          else
          {
          console.log(data);
            this._router.navigate(['menu/category_home']);
          }


        //  this.currentdialog.close();
        this.matDialog.close();
        }
      );
    }
    else
    {
      this._router.navigate(['menu/category_home']);
    }
    }


  onclickCancle()
  {
    this.flag=false;

    if(this.flag==false)
    {
      console.log(this.flag);
      this.matDialog.close();
      this._router.navigate(['menu/category_home']);
//this._router.navigate(['menu/category_home']);

    }
   /// console.log("raj");


  }
  keyPressText(event: any)
  {
    const pattern = /[A-Z\a-z\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
       if (!pattern.test(inputChar) || this.Category_name.length>=15) {
       // invalid character, prevent input
           event.preventDefault();
      }
  }

  ngOnInit() {
    this.flag=true;
    this.cat_ser.getAllCategory().subscribe(
      (data:category[])=>
      {
          //for(this.)
        this.category_list=data;
      }
    );
    }


  }
