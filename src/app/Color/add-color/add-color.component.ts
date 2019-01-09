import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { color } from "../../classes/color_class";
import {ColorService } from '../../Services/color.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ColorHomeComponent } from '../color-home/color-home.component';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.css']
})
export class AddColorComponent implements OnInit {
  color_arr:color[];
  Color_name:string;
  flag:boolean=false;
  i:number;

  constructor(private color_ser:ColorService,private _router:Router,private matDialog:MatDialogRef<ColorHomeComponent>,private _act:ActivatedRoute) { }

  ngOnInit() {
    this.color_ser.getAllColor().subscribe(
      (data:color[])=>
      {
        this.color_arr=data;
      }
    );

  }
  onclickAdd()
  {

   this.color_ser.addColor(new color(this.Color_name)).subscribe(
     (data:any)=>
     {
       console.log(data);
       this._router.navigate(['menu/color_home']);
       //this.currentdialog.close();
       this.matDialog.close();
     }
   );
  }

 onclickCancle()
 {
   this._router.navigate(['menu/color_home']);

 }


}
