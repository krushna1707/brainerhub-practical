import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from 'src/app.service';
import { Category } from 'src/models/category.model';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports:[SequelizeModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [AppService, CategoryService]
})
export class CategoryModule {}
