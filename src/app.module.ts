import { Module } from '@nestjs/common';
import { VerificacionModule } from './verificacion/verificacion.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { env } from 'process';
import { EnvConfiguration } from './config/app.config';
import { JoiValidationShema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ EnvConfiguration],
      validationSchema: JoiValidationShema
    }),
    VerificacionModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public',)
    }),
  MongooseModule.forRoot(process.env.MONGODB),
  CommonModule,
  SeedModule,
  ],
  controllers: [],
  providers: [],
  exports:[
  ],
})
export class AppModule {
}
