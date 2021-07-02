import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Product } from './product.module';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.productService.insertProduct(
      prodTitle,
      prodDescription,
      prodPrice,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    return await this.productService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') prodID: string) {
    return await this.productService.getSingleProduct(prodID);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodID: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ) {
    return await this.productService.updateProduct(
      prodID,
      prodTitle,
      prodDescription,
      prodPrice,
    );
  }

  @Delete(':id')
  async deleteProduct(@Param('id') prodID: string) {
    return await this.productService.deleteProduct(prodID);
  }
}
