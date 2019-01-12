export class supplier_order{
  constructor(
    public supplier_order:number,
    public Fk_stock_id:number,
    public quantity:number,
    public price:number,
    public status:string
  ){ }
};
