import { Component, OnInit,Inject } from '@angular/core';
import { CategoryService } from '../../Services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { category } from '../../classes/category_class';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryHomeComponent } from '../category-home/category-home.component';


@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  category_id:number;
  tmp_category_data:category;
  Category_name:String;
  flag:boolean=false;
  i:number;
  constructor(private cat_ser:CategoryService,private _router:Router,private _act:ActivatedRoute,public dialogRef: MatDialogRef<CategoryHomeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('Injected data', data)

   }
  onclickUpdate()
  {
    if(this.flag==true)
    {


    //console.log("xyz");
    this.cat_ser.updateCategory(new category(this.Category_name,this.category_id)).subscribe(
      (data:any)=>
      {
        if(data.errno==1062)
        {
          alert('Item is already in your list');
        }
        else
        {
          console.log(data);
          alert("category updated");

        }
               this.dialogRef.close();
      }
    );
    }
  }

  onclickCancle()
  {
    this.flag=false;
    if(this.flag==false)
    {
      this.dialogRef.close();

    this._router.navigate(['menu/category_home']);
    }
  }

  ngOnInit() {
    this.flag=true;
    this.category_id=this._act.snapshot.params["id"];
    this.category_id=this.data.id;
    this.cat_ser.getCategoryById(this.category_id).subscribe(
      (data:category[])=>
      {
        this.tmp_category_data=data[0];
        this.Category_name=this.tmp_category_data.Category_name;
        console.log(this.Category_name);
      }
    );
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


}
