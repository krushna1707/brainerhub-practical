import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from 'src/app.service';
import { ProductCategory } from 'src/models/product-category.model';
import { Product } from 'src/models/product.model';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [SequelizeModule.forFeature([Product, ProductCategory])],
  controllers: [ProductController],
  providers: [ProductService,AppService]
})
export class ProductModule {}
