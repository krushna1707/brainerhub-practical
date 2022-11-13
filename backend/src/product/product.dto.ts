import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class ProductDto {

    @IsString()
    @IsNotEmpty()
    categoryIds: string;

    @IsString()
    @IsNotEmpty()
    productName: string;
  
    @Type(()=> Number)
    @IsNumber()
    @Min(1) 
    @Max(99999.99)
    @IsNotEmpty()
    productPrice: Number;

    @IsString()
    @IsNotEmpty()
    productDesc: string;

  }