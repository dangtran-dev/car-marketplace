import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Matches, Min } from 'class-validator';
import { Condition, FuelType, Transmission } from 'generated/prisma';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'Year cannot be negative' })
  year: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'Price cannot be negative' })
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0, { message: 'Mileage cannot be negative' })
  mileage: number;

  @IsNotEmpty()
  @IsString()
  fuelType: FuelType;

  @IsNotEmpty()
  @IsString()
  condition: Condition;

  @IsNotEmpty()
  @IsString()
  transmission: Transmission;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, {
    message: 'Invalid phone number format',
  })
  phone: string;
}
