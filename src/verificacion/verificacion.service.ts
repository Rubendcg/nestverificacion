import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateVerificacionDto } from './dto/create-verificacion.dto';
import { UpdateVerificacionDto } from './dto/update-verificacion.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Verificacion } from './entities/verificacion.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VerificacionService {

  private defaultLimit: number

  constructor(
    @InjectModel( Verificacion.name)
    private  readonly VerificacionModel: Model<Verificacion>,
    private readonly configService: ConfigService
  ){
    this.defaultLimit =configService.get<number>('defaullimit')
    
  }
  async create(createVerificacionDto: CreateVerificacionDto) {
    createVerificacionDto.placa = createVerificacionDto.placa.toLocaleLowerCase()
    createVerificacionDto.niv = createVerificacionDto.niv.toLocaleLowerCase()
    createVerificacionDto.propietario = createVerificacionDto.propietario.toLocaleLowerCase()
    createVerificacionDto.propietarioReal = createVerificacionDto.propietarioReal.toLocaleLowerCase()

    try {
      const verificacion = await this.VerificacionModel.create( createVerificacionDto)
      console.log(verificacion)
      return verificacion
      
    } catch (error) {
      this.handleException(error)
    }
  }

  findAll( paginationDto: PaginationDto ) {

    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    return this.VerificacionModel.find()
      .limit( limit )
      .skip( offset )
      .sort({
        no: 1
      })
      .select('-__v');
      
  }

  async findOne(termino: string) {
    let verificacion: Verificacion
    if(isValidObjectId(termino) ){
      verificacion = await this.VerificacionModel.findById(termino)
    }
    //Busqueda por placa
    if(!verificacion){
      verificacion = await this.VerificacionModel.findOne({ placa: termino.toLocaleLowerCase()})
    }

    if(!verificacion){
      throw  new NotFoundException(`Verificacion no existe ${termino}`)
    }
    return verificacion;
  }

  async update(termino: string, updateVerificacionDto: UpdateVerificacionDto) {
    const verificacion = this.findOne(termino);
    
    if( updateVerificacionDto.placa)
      updateVerificacionDto.placa = updateVerificacionDto.placa.toLocaleLowerCase()

      try {
        await (await verificacion).updateOne(updateVerificacionDto,{new: true})
        return {... (await verificacion).toJSON(),...updateVerificacionDto};

      } catch (error) {
        this.handleException(error)
      }
    
  }

  async remove(id: string) {
    // const verificacion = await this.findOne(id)
    // await verificacion.deleteOne()
    // const result = this.VerificacionModel.findByIdAndDelete(id)
    const {deletedCount} = await this.VerificacionModel.deleteOne({_id:id })
    if( deletedCount === 0){
      throw new BadRequestException(`Verificacion con ID ${id} no encontrado`)
    }
    return 
  }

  private handleException(error: any){
    if( error.code === 11000){
      console.log(error)
      throw new BadRequestException(`El valor existe en la Base de datos ${ JSON.stringify(error.keyValue)}`)
    }
    console.log(error)
    throw new InternalServerErrorException(`No se pudo Crear la verificación`)

  }
}
