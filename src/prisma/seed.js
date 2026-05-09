const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Admin123!', 10);
  const existing = await prisma.user.findUnique({ where: { email: 'admin@expense.local' } });

  if (!existing) {
    const admin = await prisma.user.create({
      data: {
        name: 'Project Admin',
        email: 'admin@expense.local',
        password,
        role: 'admin',
      },
    });

    console.log('Created admin user:', admin.email);
  } else {
    console.log('Admin user already exists:', existing.email);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
