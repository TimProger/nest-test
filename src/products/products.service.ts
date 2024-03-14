import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) {}

    async getProducts(): Promise<Product[]> {
        // const service = new ProductsService();
        const products = await this.productsRepository.find();
        return products
    }

    async getOneProductById(id: number): Promise<Product> {
        try {
            const product = await this.productsRepository.findOneByOrFail({id});
            return product
        } catch (error) {
            throw new Error('Product not found')
        }
    }

    async getOneProduct(id: number): Promise<Product> {
        try {
            const product = await this.productsRepository.findOneByOrFail({id});
            return product
        } catch (error) {
            throw new Error('Product not found')
        }
    }

    async createOneProduct(createProductDto: CreateProductDto): Promise<Product> {
        const newProduct = this.productsRepository.create(createProductDto);
        return this.productsRepository.save(newProduct);
    }

    async deleteProduct(id: number): Promise<Product> {
        try {
            const product = await this.getOneProductById(id);
            return this.productsRepository.remove(product)
        } catch (error) {
            throw new Error('Product not found')
        }
    }

    async updateOneProduct(id: number, createProductDto: CreateProductDto): Promise<Product> {
        const product = await this.getOneProductById(id);
        return this.productsRepository.save({...product, ...createProductDto});
    }

    async customQuery(): Promise<Product[]> {
        const products = await this.productsRepository.createQueryBuilder('products').select('name').getMany();
        return products
    }
}
