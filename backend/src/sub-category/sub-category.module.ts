import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from 'src/app.service';
import { Category } from 'src/models/category.model';
import { SubCategory } from 'src/models/sub-category.model';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryService } from './sub-category.service';

@Module({
  imports: [SequelizeModule.forFeature([Category,SubCategory])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService, AppService]
})
export class SubCategoryModule {}
