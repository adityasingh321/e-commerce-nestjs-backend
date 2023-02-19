import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { MongooseModule } from '@nestjs/mongoose'
import { EComModule } from './ecommerce/ecommerce.module';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { AuthenticateUser } from './common/middleware/authenticate.middleware';
import { RequestMethod } from '@nestjs/common/enums';
import { CheckAdmin } from './common/middleware/checkAdmin.middleware';

@Module({
  imports: [ProductModule, EComModule, MongooseModule.forRoot('mongodb+srv://aditya:NrfEyLdbAwXNLqR4@cluster0.8wuh340.mongodb.net/nestjs-db?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    // const allowedMethods = [RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE];
    // consumer.apply(AuthenticateUser).exclude('auth')
    consumer.apply(AuthenticateUser).forRoutes({path: '*', method: RequestMethod.ALL});
    // consumer.apply(AuthenticateUser).exclude({ path:'ecom/auth/login',method: RequestMethod.ALL}).forRoutes('*');
    // consumer.apply(CheckAdmin).forRoutes({path: 'products', method: RequestMethod.PATCH})
    // consumer.apply(CheckAdmin).forRoutes({path: 'products', method: RequestMethod.DELETE})
    // consumer.apply(CheckAdmin).forRoutes({path: 'products', method: RequestMethod.POST})
    // consumer.apply(CheckAdmin).exclude({path: 'product',method: RequestMethod.GET})
  }
}
