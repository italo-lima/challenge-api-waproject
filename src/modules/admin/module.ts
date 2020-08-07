import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { TestController } from './controllers/test';
import { UserController } from './controllers/user';
import { ProductController } from './controllers/products';
import { RenewTokenMiddleware } from './middlewares/renewToken';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { UserService } from './services/user';
import { ProductService } from './services/product';
import { ProductRepository } from './repositories/product';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, UserController, TestController, ProductController],
  providers: [AuthService, UserRepository, UserService, ProductRepository, ProductService]
})
export class AdminModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RenewTokenMiddleware).forRoutes('*');
  }
}
