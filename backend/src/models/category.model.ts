import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: "category" })
export class Category extends Model {
    @Column({
        autoIncrement: true,
        primaryKey: true
    })
    id: Number;
    
    @Column
    name: string;

    @Column
    description: string;

}