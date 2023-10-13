import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { VerificacionService } from './verificacion.service';
import { CreateVerificacionDto } from './dto/create-verificacion.dto';
import { UpdateVerificacionDto } from './dto/update-verificacion.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id-pipe/parse-mongo-id-pipe.pipe';
import { PaginationDto } from 'src/common/dto/paginationDto.dto';

@Controller('verificacion')
export class VerificacionController {
  constructor(private readonly verificacionService: VerificacionService) {}

  @Post()
  // @HttpCode(200)
  create(@Body() createVerificacionDto: CreateVerificacionDto) {
    return this.verificacionService.create(createVerificacionDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.verificacionService.findAll(paginationDto);
  }

  @Get(':termino')
  findOne(@Param('termino') termino: string) {
    return this.verificacionService.findOne(termino);
  }

  @Patch(':termino')
  update(@Param('termino') termino: string, @Body() updateVerificacionDto: UpdateVerificacionDto) {
    return this.verificacionService.update(termino, updateVerificacionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe ) id: string) {
    return this.verificacionService.remove(id);
  }
}
