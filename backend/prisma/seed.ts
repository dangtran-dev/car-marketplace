import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const brands = [
    {
      name: 'Toyota',
      logoUrl: '/brands/toyota.svg',
    },
    {
      name: 'Honda',
      logoUrl: '/brands/honda.svg',
    },
    {
      name: 'Mazda',
      logoUrl: '/brands/mazda.svg',
    },
    {
      name: 'Hyundai',
      logoUrl: '/brands/hyundai.svg',
    },
    {
      name: 'Kia',
      logoUrl: '/brands/kia.svg',
    },
    {
      name: 'Ford',
      logoUrl: '/brands/ford.svg',
    },
    {
      name: 'VinFast',
      logoUrl: '/brands/vinfast.svg',
    },
    {
      name: 'Mercedes-Benz',
      logoUrl: '/brands/mercedes.svg',
    },
    {
      name: 'BMW',
      logoUrl: '/brands/bmw.svg',
    },
    {
      name: 'Audi',
      logoUrl: '/brands/audi.svg',
    },
    {
      name: 'Volkswagen',
      logoUrl: '/brands/volkswagen.svg',
    },
    {
      name: 'Nissan',
      logoUrl: '/brands/nissan.svg',
    },
    {
      name: 'Suzuki',
      logoUrl: '/brands/suzuki.svg',
    },
    {
      name: 'Mitsubishi',
      logoUrl: '/brands/mitsubishi.svg',
    },
    {
      name: 'Peugeot',
      logoUrl: '/brands/peugeot.svg',
    },
    {
      name: 'Chevrolet',
      logoUrl: '/brands/chevrolet.svg',
    },
    {
      name: 'Lexus',
      logoUrl: '/brands/lexus.svg',
    },
    {
      name: 'Volvo',
      logoUrl: '/brands/volvo.svg',
    },
    {
      name: 'Land Rover',
      logoUrl: '/brands/landrover.svg',
    },
    {
      name: 'Jaguar',
      logoUrl: '/brands/jaguar.svg',
    },
    {
      name: 'Porsche',
      logoUrl: '/brands/porsche.svg',
    },
    {
      name: 'Tesla',
      logoUrl: '/brands/tesla.svg',
    },
    {
      name: 'Isuzu',
      logoUrl: '/brands/isuzu.svg',
    },
    {
      name: 'Subaru',
      logoUrl: '/brands/subaru.svg',
    },
    {
      name: 'MG',
      logoUrl: '/brands/mg.svg',
    },
    {
      name: 'BYD',
      logoUrl: '/brands/byd.svg',
    },
    {
      name: 'Chery',
      logoUrl: '/brands/chery.svg',
    },
    {
      name: 'Geely',
      logoUrl: '/brands/geely.svg',
    },
  ];

  await prisma.brand.createMany({
    data: brands,
    skipDuplicates: true,
  });

  console.log('Seeded all car brands successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
