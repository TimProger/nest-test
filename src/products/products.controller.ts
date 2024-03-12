import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Get()
    getProducts(@Query('limit') name: string) {
        // const service = new ProductsService();
        const products = this.productsService.getProducts(name);
        return products
    }

    @Get(':id')
    getOneProduct(@Param('id', ParseIntPipe) id: number) {
        try {
            const product = this.productsService.getOneProducts(id);
            return product
        } catch (error) {
            throw new NotFoundException('Product not found')
        }
    }

    @Post()
    addOneProduct(@Body(new ValidationPipe()) product: CreateProductDto) {
        const newProduct = this.productsService.createProducts(product);
        return {
            newProduct
        }
    }

    @Put(':id')
    updateOneProduct(@Param('id', ParseIntPipe) id: number, @Body() product: CreateProductDto) {
        return {
            id,
            product: product
        }
    }

    @Delete(':id')
    removeOneProduct(@Param('id', ParseIntPipe) id: number) {
        try {
            const status = this.productsService.removeOneProducts(id);
            return {
                status
            }
        } catch (error) {
            throw new NotFoundException('Product not found')
        }
    }
}
