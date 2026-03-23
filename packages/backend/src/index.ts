import { createApp } from './app';
import { config } from './config';
import { prisma } from './db';

async function main(): Promise<void> {
  const app = createApp();

  await prisma.$connect();
  console.log('✅ Database connected');

  app.listen(config.PORT, () => {
    console.log(`🚀 Server running on http://localhost:${config.PORT}`);
    console.log(`   Environment: ${config.NODE_ENV}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
