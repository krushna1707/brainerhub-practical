import { Column, Model, Table, Unique } from 'sequelize-typescript';

@Table({ tableName: "product_category" })
export class ProductCategory extends Model {
    @Unique('product_category_unique')
    @Column
    productId: Number

    @Unique('product_category_unique')
    @Column
    categoryId: Number

}