import { Component, OnInit } from "@angular/core";
import { Observable } from "../../../../node_modules/rxjs";
import { FormControl } from "../../../../node_modules/@angular/forms";
import { employee } from "src/app/classes/employee_class";
import { EmployeeService } from "src/app/Services/employee.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-withdrawal",
  templateUrl: "./withdrawal.component.html",
  styleUrls: ["./withdrawal.component.css"]
})
export class WithdrawalComponent implements OnInit {
  constructor(
    private emp_ser: EmployeeService,
    private _formBuilder: FormBuilder
  ) {}
  selected_employee: employee;
  selected_amount:number;
  selected_opt:string;

  employee_list: employee[] = [];
  withdrawal_amount:number[]=[
    5000,
    10000,
    15000
  ];
  emi_option:string[]=[
    "6 Months",
    "12 Months",
    "18 Months"
  ];
  flag:number=0;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  emp: string[] = [];
  emp_salary:number;
  emp_join:Date;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup:FormGroup;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ["", Validators.required]
    });

    this.emp_ser.getAllEmp().subscribe((data: any[]) => {
      this.employee_list = data;
      console.log(data);
    });
  }

  onemployeeChange() {
    console.log(this.selected_employee);
    if(this.selected_employee==null)
    {
      this.flag=1;
    }
  }
  onclickAdd() {}

  onwithdrawalamountChange()
  {
    console.log(this.selected_amount);
  }
  next()
  {
    console.log(this.selected_opt);
  }

  onclickemp(){
    this.emp_ser.getEmpById(this.selected_employee.Email_id).subscribe((data:employee[])=>{
      console.log(data);
      //this.emp_join=data[0].
    })

  }
  // daydiff(d1,d2){
  //         var days;
  //         var diffdays;
  //         days= (d2.getTime()-d1.getTime());
  //         diffdays=Math.ceil((days/(1000*3600*24)));
  //         return diffdays;
  //       }
  //       console.log(
  //         daydiff(new Date(data[0].employee_joining_date),
  //         new Date(Date.now()))
  //       );
  //         monthDiff(d1, d2) {
  //         var months;
  //        months = (d2.getFullYear() - d1.getFullYear()) * 12;
  //        months -= d1.getMonth()+1 ;
  //         months += d2.getMonth();
  //         return months <= 0 ? 0 : months;
  //     }
  //     console.log(
  //       monthDiff(

  //         new Date(data[0].employee_joining_date),
  //         new Date(Date.now())
  //     )
  //   );
}
