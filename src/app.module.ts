import { Module } from '@nestjs/common';
import { VerificacionModule } from './verificacion/verificacion.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [VerificacionModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public',)
    }),
  MongooseModule.forRoot('mongodb://localhost:27019/nestVerificacion'),
  CommonModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
