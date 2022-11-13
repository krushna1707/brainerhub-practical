import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class SubCategoryDto {

  @Type(() => Number)
  @IsNotEmpty()
  categoryId: Number

  @IsString()
  @IsNotEmpty()
  subCategoryName: string;

  @IsString()
  @IsNotEmpty()
  subCategoryDesc: string;

}