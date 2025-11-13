import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { AboutModule } from './about/about.module';
import { BlogModule } from './blog/blog.module';
import { Post } from './blog/database/blog.entity';

import { Application } from './user/entity/application.entity';

@Module({
  imports: [
   
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://project_skillplus_user:2GQSlMy1JoHmHEXrVnIkqxf7clCWxJ1G@dpg-d4b0vmqli9vc73dm9vfg-a/project_skillplus',
      synchronize: true,           // فقط برای توسعه
      autoLoadEntities: true,
      entities: [User],
    }),
    UserModule,
         AboutModule,
         BlogModule,
  ],
  controllers: [AppController],
   providers: [AppService],

})
export class AppModule {}
// @Module({
//   imports: [
    
//     TypeOrmModule.forRoot({
//       type:'postgres',
//       host:'localhost',
//       port:5432,
//       username:'postgres',
//       password:'admin',
//       database:'postgres',
//       synchronize:true,
//       entities:[User,Post,Application],
     


//     }),
//     UserModule,
//     AboutModule,
//     BlogModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
