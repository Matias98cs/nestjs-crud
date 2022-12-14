import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product> ){}

    async getProducts() : Promise<Product[]> {
        const products = await this.productModel.find()
        return products
    }

    async getProduct(productID: string) : Promise<Product> {
        const productFind = await this.productModel.findById(productID)
        return productFind
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        const newPorduct =  new this.productModel(createProductDTO)
        return await newPorduct.save()
    }

    async deleteProduct(productID: string) : Promise<Product> {
        const deleteProduct =  await this.productModel.findByIdAndRemove(productID)
        return deleteProduct
    }

    async updateProduct(productID: string, createProductDTO: CreateProductDTO): Promise<Product> {
        const updatedProduct =  await this.productModel.findByIdAndUpdate(productID, createProductDTO, {new: true})
        return updatedProduct
    }
}
