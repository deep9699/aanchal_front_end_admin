import { Component, OnInit,Inject } from '@angular/core';
import { SizeService } from '../../Services/size.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Router, ActivatedRoute } from '@angular/router';
import { SizeHomeComponent } from '../../Size/size-home/size-home.component';
import { size } from '../../classes/size_class';

@Component({
  selector: 'app-update-size',
  templateUrl: './update-size.component.html',
  styleUrls: ['./update-size.component.css']
})
export class UpdateSizeComponent implements OnInit {
  Size_id:number;
  tmp_size_data:size;
  Size_name:string;
  flag:boolean=false;
  i:number;
  constructor(private size_ser:SizeService,private _router:Router,private _act:ActivatedRoute,public dialogRef: MatDialogRef<SizeHomeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.Size_id=this._act.snapshot.params["id"];
    this.Size_id=this.data.id;
    this.size_ser.getSizeById(this.Size_id).subscribe(
      (data:size[])=>
      {
        this.tmp_size_data=data[0];
        this.Size_name=this.tmp_size_data.Size_name;
        console.log(this.Size_name);
      }
    );

  }

  onclickUpdate()
  {
    //console.log("xyz");
    this.size_ser.updatesize(new size(this.Size_name,this.Size_id)).subscribe(
      (data:any)=>
      {
        console.log(data);
        alert("category updated");
        this.dialogRef.close();
        this._router.navigate(['menu/size_home']);
      }

    );
  }

  onclickCancle()
  {
    this._router.navigate(['menu/size_home']);
  }
}
