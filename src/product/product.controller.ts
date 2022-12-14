import { Controller, Post, Put, Delete, Get, Param, Res, HttpStatus, Body, NotFoundException, Query } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Post('/create')
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.createProduct(createProductDTO)
        return res.status(HttpStatus.OK).json({message: 'Producto creado', product})
    }

    @Get('/')
    async getProducts(@Res() res) {
        const products = await this.productService.getProducts()
        return res.status(HttpStatus.OK).json({message: 'Todos los productos', products})
    }

    @Get('/:productID')
    async getProduct(@Res() res, @Param('productID') productID){
        const findProduct = await this.productService.getProduct(productID)
        if(!findProduct) throw new NotFoundException('Producto no existe')
        return res.status(HttpStatus.OK).json({message: 'Producto encontrado', findProduct})
    }

    @Delete('/delete')
    async deleteProduct(@Res() res , @Query('productID') productID){
        const deleteProduct = await this.productService.deleteProduct(productID)
        if(!deleteProduct) throw new NotFoundException('Hubo un error, el producto no se elimino')
        return res.status(HttpStatus.OK).json({message: 'Producto eliminado', deleteProduct})
    }

    @Put('/update')
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID){
        const updateProduct = await this.productService.updateProduct(productID, createProductDTO)
        if(!updateProduct) throw new NotFoundException('Hubo un error, el producto no se pudo actualizar')
        return res.status(HttpStatus.OK).json({message: 'Producto actualizado', updateProduct})
    }
}
