import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Get('/list')
    @ApiQuery({name: 'page', type: 'number', required: false})
    @ApiQuery({name: 'limit', type: 'number', required: false})
    async list(@Query() query: {page:number, limit: number}) {
        try{
            let category = await this.categoryService.list(query.page, query.limit)
            return {
                statusCode: 200,
                message: "Category retrieved successfully",
                data: category
            };
        } catch(error){
            throw new BadRequestException(error)
        }       
    }

    @Post('/add')
    async add(@Body() body: CategoryDto) {
        try{
            const category = await this.categoryService.add(body)
            return {
                statusCode: 200,
                message: "Category added successfully",
                data: category
            };
        } catch(error){
            throw new BadRequestException(error)
        }           
           
    }

    @Put('/update/:id')
    async upload(@Body() body: CategoryDto, @Param('id') id: string) {     
        try{
            console.log(id)
            const categoryUpdate = await this.categoryService.update(body, id)
            return {
                statusCode: 200,
                message: "Category updated successfully",
                data: categoryUpdate
            };
        } catch(error){
            throw new BadRequestException(error)
        }
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: string){
        try{
            await this.categoryService.delete(id)
            return {
                statusCode: 200,
                message: "Category deleted successfully",
                data: null
            };
        } catch(error){
            throw new BadRequestException(error)
        }
    }
}
