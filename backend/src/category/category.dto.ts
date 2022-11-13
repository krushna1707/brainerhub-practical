import { IsNotEmpty, IsString } from "class-validator";

export class CategoryDto {

  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @IsString()
  @IsNotEmpty()
  categoryDesc: string;

}