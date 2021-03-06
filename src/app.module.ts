import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModel } from './products/products.module';
import { UserModule } from './user/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ProductsModel,
    UserModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
