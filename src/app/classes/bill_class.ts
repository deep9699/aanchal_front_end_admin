export class bill{
  constructor(

    public Bill_id:number,
    public Bill_date:Date,
    public Total_amount:number,
    public Fk_customer_id:number
      ){ }
};
