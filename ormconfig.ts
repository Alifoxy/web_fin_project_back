import { DataSource } from 'typeorm';
import configuration from './src/configs/configuration';
import * as dotenv from 'dotenv';
// import * as path from 'node:path';

dotenv.config();

const config = configuration().database;

export default new DataSource({
  type: 'mysql',
  host: config.host,
  port: config.port,
  username: config.user,
  password: config.password,
  database: config.name,
  entities: [
    // path.join(process.cwd(), 'src', 'database', 'entities', '*.entity.js'),
    'src/database/entities/*.entity{.ts,.js}',
  ],
  migrations: [
    // path.join(process.cwd(), 'src', 'database', 'migrations', '*.ts'),
    'src/database/migrations/*.ts',
  ],
  synchronize: false,
});
