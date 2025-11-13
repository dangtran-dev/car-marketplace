import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto';
import { getUser } from 'src/common/decorator';
import { JwtAccessAuthGuard } from 'src/common/guards';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get('brands')
  getCarBrands() {
    return this.carsService.getCarBrands();
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
}
