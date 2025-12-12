import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreateCarDto, PaginationDto } from './dto';

@Injectable()
export class CarsService {
  constructor(
    private prisma: PrismaService,
    private supabaseService: SupabaseService,
  ) {}

  async getAllCars(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;

    const skip = (page - 1) * limit;
    const take = limit;

    const [cars, carCount] = await Promise.all([
      this.prisma.car.findMany({
        skip,
        take,
        select: {
          id: true,
          model: true,
          year: true,
          mileage: true,
          fuelType: true,
          price: true,
          images: true,
          Brand: {
            select: {
              name: true,
            },
          },
          BodyType: {
            select: {
              name: true,
            },
          },
          User: {
            select: {
              name: true,
            },
          },
        },
      }),
      this.prisma.car.count(),
    ]);

    return {
      page,
      limit,
      total: carCount,
      data: cars,
    };
  }

  async getCarBrands() {
    const brands = await this.prisma.brand.findMany({});

    return brands;
  }

  async getCarBodyTypes() {
    const bodyTypes = await this.prisma.bodyType.findMany({});

    return bodyTypes;
  }

  async getCarFilters() {
    try {
      const [brands, bodyTypes] = await Promise.all([
        this.prisma.brand.findMany({
          select: {
            id: true,
            name: true,
          },
        }),
        this.prisma.bodyType.findMany({
          select: {
            id: true,
            name: true,
          },
        }),
      ]);

      return {
        brands,
        bodyTypes,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to load car filters. Please try again later.',
      );
    }
  }

  async sellCar(
    files: Array<Express.Multer.File>,
    dto: CreateCarDto,
    userId: string,
  ) {
    if (!files) throw new BadRequestException('No file upload');
    const bucket = 'images';

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

    const newSellCar = await this.prisma.car.create({
      data: {
        brandId: dto.brand,
        bodyTypeId: dto.bodyType,
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

    return newSellCar;
  }

  async getCar(id: string) {
    const car = await this.prisma.car.findUnique({
      where: {
        id: id,
      },
      include: {
        Brand: {
          select: {
            name: true,
          },
        },
        BodyType: {
          select: {
            name: true,
          },
        },
        User: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!car) {
      throw new NotFoundException(`Car with id ${id} was not found`);
    }

    return car;
  }
}
