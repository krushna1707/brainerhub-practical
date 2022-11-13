import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SubCategoryDto } from './sub-category.dto';
import { SubCategoryService } from './sub-category.service';

@ApiTags('Sub Category')
@Controller('sub-category')
export class SubCategoryController {
    constructor(private subCategoryService: SubCategoryService) {}

    @Get('/list')
    @ApiQuery({name: 'page', type: 'number', required: false})
    @ApiQuery({name: 'limit', type: 'number', required: false})
    async list(@Query() query: {page:number, limit: number}) {
        try{
            let category = await this.subCategoryService.list(query.page, query.limit)
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
    async add(@Body() body: SubCategoryDto) {
        try{
            const category = await this.subCategoryService.add(body)
            return {
                statusCode: 200,
                message: "Sub category added successfully",
                data: category
            };
        } catch(error){
            throw new BadRequestException(error)
        }           
           
    }

    @Put('/update/:id')
    async upload(@Body() body: SubCategoryDto, @Param('id') id: string) {     
        try{
            console.log(id)
            const categoryUpdate = await this.subCategoryService.update(body, id)
            return {
                statusCode: 200,
                message: "Sub category updated successfully",
                data: categoryUpdate
            };
        } catch(error){
            throw new BadRequestException(error)
        }
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: string){
        try{
            await this.subCategoryService.delete(id)
            return {
                statusCode: 200,
                message: "Sub category deleted successfully",
                data: null
            };
        } catch(error){
            throw new BadRequestException(error)
        }
    }
}
