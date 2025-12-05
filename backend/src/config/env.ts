import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 4000,
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  dbUrl: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/smm',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379'
};
