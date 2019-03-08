import { Component, OnInit } from "@angular/core";
import { Observable } from "../../../../node_modules/rxjs";
import { FormControl } from "../../../../node_modules/@angular/forms";
import { employee } from "src/app/classes/employee_class";
import { EmployeeService } from "src/app/Services/employee.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
export class withdrawal
{
  constructor(public Withdrawal_amount:number,public EMI_amount:number,public Fk_e_email_id:string){}
}
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
  selected_opt:number;

  employee_list: employee[] = [];
  withdrawal_amount:number[]=[
    5000,
    10000,
    15000
  ];
  emi_option:number[]=[
    10,
    20,
    30
  ];
  flag:number=0;
  flag1:boolean=false;
  flag2:boolean=true;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  emp: string[] = [];
  emp_salary:number;
  emp_join:Date;
  withdrawamt:number=0;
  maxwithdraw:number=0;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup:FormGroup;
  emi_amount:number;

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

    this.emp_ser.getWithdrawlDetailsByEmployeeid(this.selected_employee.Email_id).subscribe(
      (data:any)=>{

        if(data.length==1)
        {
            alert('Already in');
          this.flag2=false;
        }
        else
        {
          this.flag2=true;
        }
      }
    )


  }
  onclickAdd() {}


  next()
  {
    console.log(this.withdrawamt);
    console.log(this.selected_opt);
    this.emi_amount=(this.emp_salary*this.selected_opt/100);
    console.log(this.emi_amount);
  }

  onclickemp(){

    this.emp_ser.getEmpById(this.selected_employee.Email_id).subscribe((data:employee[])=>{
      console.log(data);

      this.emp_join=data[0].Joining_date;
      this.emp_salary=data[0].Salary;

      console.log(this.emp_join);
      console.log(this.emp_salary);

      // function daydiff(d1,d2){
      //   var days;
      //   var diffdays;
      //   days= (d2.getTime()-d1.getTime());
      //   diffdays=Math.ceil((days/(1000*3600*24)));
      //   return diffdays;
      // }
      // if(this.emp_salary<=30000)
      // {

      //           console.log(
      //             daydiff(new Date(this.emp_join),
      //             new Date(Date.now()))
      //           );
      //   this.maxwithdraw=100000;
      // }
      // else if(this.emp_salary>30000 && this.emp_salary<=50000)
      // {
      //   this.maxwithdraw=200000;
      // }
      // else
      // {
      //   this.maxwithdraw=500000;
      // }
    });


  }

  onamtchange()
  {
    console.log(this.withdrawamt);
    if(this.withdrawamt<1000)
    {
      this.flag1=false;
    }
    else
    {
      this.flag1=true;
    }
  }

  onclickamt()
  {

  }

  Done()
  {
      this.emp_ser.addwithdrawlAmount(new withdrawal(this.withdrawamt,this.emi_amount,this.selected_employee.Email_id)).subscribe((data:any)=>{
        console.log(data);
      }
      );
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
