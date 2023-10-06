import { IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateVerificacionDto {

    @IsString()
    placa: string
    
    @IsString()
    niv:string
    
    @IsString()
    propietario:string
    
    @IsString()
    propietarioReal:string
    
    @Min(1)
    @IsPositive()
    modelo:number
}

