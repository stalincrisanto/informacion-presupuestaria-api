import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Metr@Quito', 10);
  
  await prisma.user.upsert({
    where: { username: 'secplanificacion' },
    update: {},
    create: {
      username: 'secplanificacion',
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