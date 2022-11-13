import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './product.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get('/list')
    @ApiQuery({name: 'page', type: 'number', required: false})
    @ApiQuery({name: 'limit', type: 'number', required: false})
    @ApiQuery({name: 'categoryId', type: 'number', required: false})
    async list(@Query() query: {page:number, limit: number, categoryId: number}) {
        try{
            let product = await this.productService.list(query.page, query.limit, query.categoryId)
            return {
                statusCode: 200,
                message: "Product retrieved successfully",
                data: product
            };
        } catch(error){
            throw new BadRequestException(error)
        }       
    }

    @Post('/add')
    @UseInterceptors(FileInterceptor('productImage'))
    async add(@UploadedFile() productImage: Express.Multer.File, @Body() body: ProductDto) {
        if(productImage){            
            try{
                const product = await this.productService.add(body, productImage)
                console.log(product)
                return {
                    statusCode: 200,
                    message: "Product added successfully",
                    data: product
                };
            } catch(error){
                throw new BadRequestException(error)
            }           
        } else {
            throw new BadRequestException("Please select product image")
        }       
    }

    @Put('/update/:id')
    @UseInterceptors(FileInterceptor('itemImage'))
    async upload(@UploadedFile() productImage: Express.Multer.File, @Body() body: ProductDto, @Param('id') id: string) {     
        try{
            const product = await this.productService.update(body, id, productImage)
            return {
                statusCode: 200,
                message: "Product updated successfully",
                data: product
            };
        } catch(error){
            throw new BadRequestException(error)
        }
    }

    @Delete('/delete/:id')
    async delete(@Param('id') id: string){
        try{
           await this.productService.delete(id)
            return {
                statusCode: 200,
                message: "Product deleted successfully",
                data: null
            };
        } catch(error){
            throw new BadRequestException(error)
        }
    }

    @Get('/category/:productId')
    async categoryList(@Param('productId') productId){
        try{
            const productCategory = await this.productService.productCategory(productId)
            return {
                statusCode: 200,
                message: "Product category retrieved successfully",
                data: productCategory
            };
        } catch(error){
            throw new BadRequestException(error)
        }
    }

}
