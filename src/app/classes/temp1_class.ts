import { color } from "./color_class";
import { size } from "./size_class";
import { product } from "./product_class";
import { stock } from "./stock_class";

export class temp {
  constructor(public product:product,public color:color,public size:string,public qty:number,public price:number,public id:number) {}
}
