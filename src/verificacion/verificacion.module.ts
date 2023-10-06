import { Module } from '@nestjs/common';
import { VerificacionService } from './verificacion.service';
import { VerificacionController } from './verificacion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Verificacion, VerificacionSchema } from './entities/verificacion.entity';

@Module({
  controllers: [VerificacionController],
  providers: [VerificacionService],
  imports:[
    MongooseModule.forFeature([
      {
        name: Verificacion.name,
        schema: VerificacionSchema

      }
    ])
  ]
})
export class VerificacionModule {}
