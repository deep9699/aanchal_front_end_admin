export class employee{
  constructor(
    public Email_id:string,
    public Password:string,
    public Name?:string,
    public Mobile_no?:string,
    public Address?:string,
    public DOB?:Date,
    public Salary?:number,
    public Joining_date?:Date,
    public Employee_type?:number
  ){ }
};
