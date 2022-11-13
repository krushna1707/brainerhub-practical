import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AppService } from 'src/app.service';
import { SubCategory } from 'src/models/sub-category.model';
import { SubCategoryDto } from './sub-category.dto';

@Injectable()
export class SubCategoryService {
    constructor(private appService: AppService, @InjectModel(SubCategory)
    private subCategoryModel: typeof SubCategory, private readonly sequelize: Sequelize) { }
    async list(page, limit) {
        return await this.appService.paginate({modelName: "SubCategory", page, limit}, {order:[['createdAt', 'DESC']], include:[{model:this.sequelize.models.Category, attributes:['name']}]})
       
    }

    async add(data: SubCategoryDto) {
        const [subCategory, created] = await this.subCategoryModel.findOrCreate({
            where: { categoryId: data.categoryId, name: { [Op.like]: `%${data.subCategoryName}` } },
            defaults: { categoryId: data.categoryId, name: data.subCategoryName, description: data.subCategoryDesc },
        });

        if (!created) {
            throw "Sub category already exists";
        } else {
            return subCategory;
        }
    }

    async update(data: SubCategoryDto, id: string) {
        let subCategory = await this.subCategoryModel.findByPk(id)
        if (!subCategory) {
            throw "Sub category not found";
        } else {
            const subCategoryCheck = await this.subCategoryModel.findOne({ where: { id: { [Op.not]: id }, categoryId: data.categoryId, name: { [Op.like]: `%${data.subCategoryName}` } } })
            if (!subCategoryCheck) {
                subCategory.categoryId = data.categoryId;
                subCategory.name = data.subCategoryName;
                subCategory.description = data.subCategoryDesc;
                const categoryUpdated = await subCategory.save();
                return categoryUpdated;
            } else {
                throw "Sub category already exists";
            }
        }
    }

    async delete(id: string) {
        let subCategory = await this.subCategoryModel.findByPk(id)
        if (!subCategory) {
            throw "Sub category not found";
        } else {
            await this.subCategoryModel.destroy({ where: { id } })
            return true;
        }
    }
}
