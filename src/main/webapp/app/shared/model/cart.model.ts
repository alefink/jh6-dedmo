import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/product.model';

export interface ICart {
  id?: number;
  dateCreated?: Moment;
  cantidad?: number;
  totalPrice?: number;
  product?: IProduct;
}

export class Cart implements ICart {
  constructor(
    public id?: number,
    public dateCreated?: Moment,
    public cantidad?: number,
    public totalPrice?: number,
    public product?: IProduct
  ) {}
}
