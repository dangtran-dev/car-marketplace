import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreateCarDto } from './dto';

@Injectable()
export class CarsService {
  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
  ) {}

  async getCarBrands() {
    const brands = await this.prisma.brand.findMany({});

    return brands;
  }

  async sellCar(
    files: Array<Express.Multer.File>,
    dto: CreateCarDto,
    userId: string,
  ) {
    if (!files) throw new BadRequestException('No file upload');
    const bucket = 'images';

    const brand = await this.prisma.brand.findFirst({
      where: { name: dto.brand },
    });

    if (!brand) {
      throw new BadRequestException('Selected brand does not exist');
    }

    const uploadResults = await Promise.all(
      files.map((file) =>
        this.supabaseService.uploadFile(
          bucket,
          file.buffer,
          file.originalname,
          {
            contentType: file.mimetype,
          },
        ),
      ),
    );

    const urls = uploadResults.map((r) => r.publicUrl || r.path);

    const created = await this.prisma.car.create({
      data: {
        brandId: brand.id,
        model: dto.model,
        year: dto.year,
        price: dto.price,
        mileage: dto.mileage,
        fuelType: dto.fuelType,
        condition: dto.condition,
        transmission: dto.transmission,
        description: dto.description,
        location: dto.location,
        images: urls,
        phone: dto.phone,
        userId: userId,
      },
    });

    return created;
  }
}
