import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { readFileSync, unlinkSync, writeFileSync } from 'fs'
import { Op } from 'sequelize';
import { AppService } from 'src/app.service';
import { Category } from 'src/models/category.model';
import { ProductDto } from 'src/product/product.dto';
import { CategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(private appService: AppService, @InjectModel(Category)
    private categoryModel: typeof Category) { }
    async list(page, limit) {
        return await this.appService.paginate({modelName: "Category", page, limit}, {order:[['createdAt', 'DESC']]})
       
    }

    async add(data: CategoryDto) {
        const [category, created] = await this.categoryModel.findOrCreate({
            where: { name: { [Op.like]: `%${data.categoryName}` } },
            defaults: { name: data.categoryName, description: data.categoryDesc },
        });

        if (!created) {
            throw "Category already exists";
        } else {
            return category;
        }
    }

    async update(data: CategoryDto, id: string) {
        let category = await this.categoryModel.findByPk(id)
        if (!category) {
            throw "Category not found";
        } else {
            const categoryCheck = await this.categoryModel.findOne({ where: { id: { [Op.not]: id }, name: { [Op.like]: `%${data.categoryName}` } } })
            if (!categoryCheck) {
                category.name = data.categoryName;
                category.description = data.categoryDesc;
                const categoryUpdated = await category.save();
                return categoryUpdated;
            } else {
                throw "Category already exists";
            }
        }
    }

    async delete(id: string) {
        let category = await this.categoryModel.findByPk(id)
        if (!category) {
            throw "Category not found";
        } else {
            await this.categoryModel.destroy({ where: { id } })
            return true;
        }
    }
}
