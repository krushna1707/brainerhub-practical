import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import * as dotenv from 'dotenv';
import { SubCategory } from './models/sub-category.model';
import { ProductCategory } from './models/product-category.model';
import { Product } from './models/product.model';
import { JwtMiddleware } from './jwt.middleware';
dotenv.config();

@Global()
@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }), SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      dialect: 'mysql',
      host: configService.get('DATABASE_HOST'),
      port: +configService.get('DATABASE_PORT'),
      username: configService.get('DATABASE_USERNAME'),
      password: configService.get('DATABASE_PASSWORD'),
      database: configService.get('DATABASE_NAME'),
      autoLoadModels: true,
      repositoryMode: true,
      synchronize: true,
      define: {
        freezeTableName: false
      },
      models: [Category, SubCategory, ProductCategory, Product],
    }),
    inject: [ConfigService],
  }), AuthModule, CategoryModule, SubCategoryModule, ProductModule, MulterModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, JwtService]
})
export class AppModule  implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude({path:'api/auth/(.*)', method: RequestMethod.ALL})
      .forRoutes('*');
  }
}
