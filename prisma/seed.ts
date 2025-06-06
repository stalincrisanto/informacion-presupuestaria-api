import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Metr@Quito', 10);
  
  await prisma.user.upsert({
    where: { username: 'stalin.crisanto' },
    update: {},
    create: {
      username: 'stalin.crisanto',
      password: hashedPassword,
    }
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });