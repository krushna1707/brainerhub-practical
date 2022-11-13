import { Column, DataType, HasOne, Model, Table } from 'sequelize-typescript';
import { ProductCategory } from './product-category.model';

@Table({ tableName: "product" })
export class Product extends Model {
    @Column({
        autoIncrement: true,
        primaryKey: true
    })
    id: Number;

    @Column
    name: string;

    @Column
    description: string;

    @Column(DataType.DOUBLE)
    price: Number

    @Column
    image: string

    @HasOne(() => ProductCategory, "productId")
    productCategory: ProductCategory;

}