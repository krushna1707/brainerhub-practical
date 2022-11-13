import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { Category } from './category.model';

@Table({ tableName: "sub_category" })
export class SubCategory extends Model {
    @Column({
        autoIncrement: true,
        primaryKey: true
    })
    id: Number;

    @Column
    categoryId: Number

    @Column
    name: string;

    @Column
    description: string;

    @BelongsTo(() => Category, "categoryId")
    category: Category;

}