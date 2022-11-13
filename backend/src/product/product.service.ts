import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { unlinkSync } from 'fs';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AppService } from 'src/app.service';
import { ProductCategory } from 'src/models/product-category.model';
import { Product } from 'src/models/product.model';
import { ProductDto } from './product.dto';
@Injectable()
export class ProductService {
    constructor(private appService: AppService, @InjectModel(Product)
    private productModel: typeof Product, @InjectModel(ProductCategory)
        private productCategoryModel: typeof ProductCategory, private readonly sequelize: Sequelize) { }
    async list(page, limit, categoryId) {
        let condition = {}
        if (categoryId && categoryId != 0) {
            condition = { include: [{ model: this.sequelize.models.ProductCategory, attributes: ['productId'], where: { categoryId } }] }
        }
        return await this.appService.paginate({ modelName: "Product", page, limit }, { order: [['createdAt', 'DESC']], ...condition })
    }

    async add(data: ProductDto, productImageFile) {

        const productCheck = await this.productModel.findOne({ where: { name: { [Op.like]: `%${data.productName}` } } })
        if (!productCheck) {
            const t = await this.sequelize.transaction();
            try {
                const image = this.appService.uploadImageFile(productImageFile, `${data.productName.replace('', '_')}_${new Date().getTime()}`);
                const product = await this.productModel.create({ name: data.productName, description: data.productDesc, image, price: data.productPrice });
                let category = data.categoryIds.split(',').map((d) => ({ categoryId: d, productId: product.id }))
                await this.productCategoryModel.bulkCreate(category);
                await t.commit();
                return product;

            } catch (error) {
                await t.rollback();
            }
        } else {
            throw "Product already exists";
        }

    }

    async update(data: ProductDto, id: string, productImageFile) {
        let product = await this.productModel.findByPk(id)
        if (!product) {
            throw "Product not found";
        } else {
            const productCheck = await this.productModel.findOne({ where: { id: { [Op.not]: id }, name: { [Op.like]: `%${data.productName}` } } })
            if (!productCheck) {
                let image = product.image;
                if (productImageFile) {
                    image = this.appService.uploadImageFile(productImageFile, `${data.productName.replace('', '_')}_${new Date().getTime()}`);
                    unlinkSync('./public' + product.image);
                }

                const t = await this.sequelize.transaction();
                try {
                    product.image = image;
                    product.name = data.productName;
                    product.description = data.productDesc;
                    const productUpdated = await product.save();
                    await this.productCategoryModel.destroy({ where: { productId: id } })
                    let category = data.categoryIds.split(',').map((d) => ({ categoryId: d, productId: product.id }))
                    await this.productCategoryModel.bulkCreate(category);
                    await t.commit();
                    return productUpdated;
                } catch (error) {
                    await t.rollback();
                }

            } else {
                throw "Product already exists";
            }
        }
    }

    async delete(id: string) {
        let product = await this.productModel.findByPk(id)
        if (!product) {
            throw "Product not found";
        } else {
            await this.productModel.destroy({ where: { id } })
            return true;
        }
    }

    productCategory(productId) {
        return this.productCategoryModel.findAll({ where: { productId } })
    }
}
