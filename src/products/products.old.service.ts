import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
    private products = [
        {
            id: 0,
            name: 'product 1'
        },
        {
            id: 1,
            name: 'product 2'
        },
        {
            id: 2,
            name: 'product 3'
        },
    ]

    getProducts(name?: string) {
        if (name) {
            return this.products.filter(product => product.name === name)
        }
        return this.products
    }

    getOneProducts(id: number) {
        const found = this.products.find(product => product.id === id)
        if(!found){
            throw new Error('Product not found')
        }
        return found
    }

    removeOneProducts(id: number) {
        const found = this.products.find(product => product.id === id)

        if(!found){
            throw new Error('Product not found')
        }

        if(found) {
            const index = this.products.indexOf(found)
            this.products.splice(index, 1)
            return {
                success: true
            }
        }else{
            return {
                success: false
            }
        }
    }

    updateOneProducts(id: number, createProductDto: CreateProductDto) {
        const found = this.products.find(product => product.id !== id)
        if(found) {
            const index = this.products.indexOf(found)
            this.products[index] = {
                ...createProductDto,
                id: found.id
            }
            return {
                success: true
            }
        }else{
            return {
                success: false
            }
        }
    }

    createProducts(createProductDto: CreateProductDto) {
        const newProduct = {
            id: Date.now(),
            ...createProductDto
        }
        this.products.push(newProduct)
        return newProduct
    }
}
