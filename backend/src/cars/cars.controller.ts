import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CarsService } from './cars.service';
import { CreateCarDto, PaginationDto } from './dto';
import { getUser } from 'src/common/decorator';
import { JwtAccessAuthGuard } from 'src/common/guards';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  getAllCars(@Query() paginationDto: PaginationDto) {
    return this.carsService.getAllCars(paginationDto);
  }

  @Get('brands')
  getCarBrands() {
    return this.carsService.getCarBrands();
  }

  @Get('body-types')
  getCarBodyTypes() {
    return this.carsService.getCarBodyTypes();
  }

  @Get('filters')
  getCarFilters() {
    return this.carsService.getCarFilters();
  }

  @Post('sell')
  @UseGuards(JwtAccessAuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  async sellCar(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() dto: CreateCarDto,
    @getUser('id') userId: string,
  ) {
    return this.carsService.sellCar(files, dto, userId);
  }

  @Get(':id')
  getCar(@Param('id') id: string) {
    return this.carsService.getCar(id);
  }
}
