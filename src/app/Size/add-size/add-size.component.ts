import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { size } from '../../classes/size_class'
import {SizeService } from '../../Services/size.service';
import { MatDialog, MatDialogRef} from '@angular/material';
import { SizeHomeComponent } from '../size-home/size-home.component';
@Component({
  selector: 'app-add-size',
  templateUrl: './add-size.component.html',
  styleUrls: ['./add-size.component.css']
})
export class AddSizeComponent implements OnInit {
size_arr:size[];
Size_name:string;
flag:boolean=false;
i:number;
  constructor(private size_ser:SizeService,private _router:Router,private matDialog:MatDialogRef<SizeHomeComponent>,private _act:ActivatedRoute) { }

  ngOnInit() {

    this.size_ser.getAllSize().subscribe(
      (data:size[])=>
      {
        this.size_arr=data;
      }
    );
    }

    onclickAdd()
   {
     console.log("xyz");
    this.size_ser.addSize(new size(this.Size_name)).subscribe(
      (data:any)=>
      {
        console.log(data);
        this._router.navigate(['menu/size_home']);
        //this.currentdialog.close();
        this.matDialog.close();
      }
    );
   }

  onclickCancle()
  {
    this._router.navigate(['menu/size_home']);

  }

  }



