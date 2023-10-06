import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

@Schema()
export class Verificacion extends Document {

    // id: string //mongo lo genera
    @Prop({
        unique: true,
        index: true
    })
    placa: string;

    @Prop({
        unique: true,
        index: true
    })
    niv: string;

    @Prop({
        unique:false,
    })
    propietario: string;
    
    @Prop()
    propietarioReal: string

    @Prop()
    modelo: number
}

export const VerificacionSchema = SchemaFactory.createForClass( Verificacion)

