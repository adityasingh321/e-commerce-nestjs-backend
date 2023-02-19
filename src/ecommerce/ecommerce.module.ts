import {Module} from "@nestjs/common";
import { EComController } from "./ecommerce.controller";
import { EComOperationController } from "./ecommerceOperation.controller";
import { EComService } from "./ecommerce.service";
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from "./ecommerce.model";
import { orderedProductSchema } from "./ecommerceOperation.model";
import { productSchema } from "../products/product.model";
import { AuthenticateUser } from "src/common/middleware/authenticate.middleware";
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { RequestMethod } from '@nestjs/common/enums';



@Module({
    imports: [MongooseModule.forFeature([{name: 'User', schema: userSchema}, {name: 'Product', schema: productSchema}, {name: 'OrderedProduct', schema: orderedProductSchema}])],
    controllers: [EComController, EComOperationController],
    providers: [EComService]
})
export class EComModule implements NestModule {
    configure(consumer: MiddlewareConsumer){
        consumer.apply(AuthenticateUser).forRoutes({path: '/ecom', method: RequestMethod.ALL});
      }
}