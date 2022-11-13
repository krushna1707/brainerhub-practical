import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';
import { FindAndCountOptions } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
  constructor(private readonly sequelize: Sequelize){
    
  }
  getHello(): string {
    return 'Hello World!';
  }

  uploadImageFile(file, fileName){
    try{
      if(file.mimetype.indexOf('image') == -1){
        throw 'Only allow jpg, png and jpeg formate';
      }
      const mimetype = file.mimetype.split('/')[1];
      const basePath = `/product/${fileName}.${mimetype}`
      writeFileSync(`./public${basePath}`, file.buffer)
      return basePath;
    } catch(error){
      throw 'Could not upload image';
    }
  }

  async paginate(options: {modelName:string, page?: string, limit?: string}, optionsSequelize: FindAndCountOptions = {}){
    const limit = parseInt(options.limit) || 10
    const page = parseInt(options.page) || 0
    const end = page * limit;
    const start = end - limit;
    let totalPages = 0;
    let pagination = {};
    if(page != 0){
      pagination = {
        limit: limit,
        offset: start,
      }
    }
    const data = await this.sequelize.models[options.modelName].findAndCountAll({
      ...optionsSequelize,
      ...pagination
    })

    totalPages = Math.ceil(data.count / limit)
    return {totalPages, currentPage: page, nextPage: page + 1, totalRows: data.count, rowPerPage: limit, rows:data.rows }
  }
}
