import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Get()
    getProducts() {
        // const service = new ProductsService();
        const products = this.productsService.getProducts();
        return products
    }

    @Get(':id')
    getOneProduct(@Param('id', ParseIntPipe) id: number) {
        try {
            const product = this.productsService.getOneProduct(id);
            return product
        } catch (error) {
            throw new NotFoundException('Product not found')
        }
    }

    @Post()
    addOneProduct(@Body(new ValidationPipe()) product: CreateProductDto) {
        const newProduct = this.productsService.createOneProduct(product);
        return {
            newProduct
        }
    }

    @Delete(':id')
    async removeOneProduct(@Param('id', ParseIntPipe) id: number) {
        try {
            await this.productsService.deleteProduct(id);
            return {
                success: true
            }
        } catch (error) {
            throw new NotFoundException('Product not found')
        }
    }
}
