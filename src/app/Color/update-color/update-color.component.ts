import { Component, OnInit,Inject} from '@angular/core';
//import { SizeService } from '../../Services/size.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { color } from "../../classes/color_class";
import {ColorService } from '../../Services/color.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ColorHomeComponent } from '../color-home/color-home.component';

@Component({
  selector: 'app-update-color',
  templateUrl: './update-color.component.html',
  styleUrls: ['./update-color.component.css']
})
export class UpdateColorComponent implements OnInit {
  Color_id:number;
  tmp_size_data:color;
Color_name:string;
  flag:boolean=false;
  i:number;

  constructor(private color_ser:ColorService,private _router:Router,private _act:ActivatedRoute,public dialogRef: MatDialogRef<ColorHomeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.Color_id=this._act.snapshot.params["id"];
    this.Color_id=this.data.id;
    this.color_ser.getColorById(this.Color_id).subscribe(
      (data:color[])=>
      {
        this.tmp_size_data=data[0];
        this.Color_name=this.tmp_size_data.Color_name;
        //console.log(this.Size_name);
      }
    );
  }

  onclickUpdate()
  {
    //console.log("xyz");
    this.color_ser.updatecolor(new color(this.Color_name,this.Color_id)).subscribe(
      (data:any)=>
      {
        console.log(data);
        alert("category updated");
        this.dialogRef.close();
        this._router.navigate(['menu/color_home']);
      }

    );
  }

  onclickCancle()
  {
    this._router.navigate(['menu/color_home']);
  }

}
