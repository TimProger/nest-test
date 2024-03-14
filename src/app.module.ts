import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [ProductsModule, TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Product])],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
