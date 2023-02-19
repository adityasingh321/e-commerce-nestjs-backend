import {Module} from "@nestjs/common";
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from "./product.model";
import { AuthenticateUser } from "src/common/middleware/authenticate.middleware";
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { RequestMethod } from '@nestjs/common/enums';
import { userSchema } from "src/ecommerce/ecommerce.model";




@Module({
    imports: [MongooseModule.forFeature([{name: 'Product', schema: productSchema}, {name: 'User', schema: userSchema}])],
    controllers: [ProductController],
    providers: [ProductService]
})
export class ProductModule implements NestModule {
    configure(consumer: MiddlewareConsumer){
        consumer.apply(AuthenticateUser).forRoutes({path: 'products', method: RequestMethod.ALL});
      }
}