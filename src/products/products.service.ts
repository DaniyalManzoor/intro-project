import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Product } from './product.module';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product')
    private readonly ProductModel: mongoose.Model<Product>,
  ) {}

  async insertProduct(title: string, description: string, price: number) {
    const newProduct = new this.ProductModel({ title, description, price });
    await newProduct.save();
    return newProduct._id as string;
  }

  async getProducts() {
    const products = await this.ProductModel.find().sort('title').exec();
    return products.map((product) => ({
      id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
    }));
  }

  async getSingleProduct(prodID: string) {
    const product = await this.findProduct(prodID);
    return {
      id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  async updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ) {
    const updateProduct = await this.findProduct(productId);

    if (title) {
      updateProduct.title = title;
    }

    if (description) {
      updateProduct.description = description;
    }

    if (price) {
      updateProduct.price = price;
    }

    await updateProduct.save();

    return updateProduct;
  }

  async deleteProduct(productId: string) {
    const result = await this.ProductModel.deleteOne({ _id: productId });
    if (result.n === 0) {
      throw new NotFoundException('Could not find product.');
    }
    return result.deletedCount;
  }

  private async findProduct(ID: string): Promise<Product> {
    let product;

    if (!mongoose.Types.ObjectId.isValid(ID))
      throw new NotFoundException('Invalid Object ID');

    try {
      product = await this.ProductModel.findById(ID).exec();
    } catch (error) {
      throw new NotFoundException('Internal Server Error.');
    }

    if (!product) throw new NotFoundException('Could not find Product');

    return product;
  }
}
