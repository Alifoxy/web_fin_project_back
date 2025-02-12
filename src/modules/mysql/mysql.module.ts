import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config, DatabaseConfig } from '../../configs/config.type';

// import * as path from 'node:path';
// import * as process from 'node:process';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<Config>) => {
        const config = configService.get<DatabaseConfig>('database');
        return {
          type: 'mysql',
          host: config.host,
          port: config.port,
          username: config.user,
          password: config.password,
          database: config.name,
          entities: [
            // path.join(
            //   process.cwd(),
            //   'dist',
            //   'src',
            //   'database',
            //   'entities',
            //   '*.entity.js',
            // ),
            'dist/src/database/entities/*.entity{.ts,.js}',
          ],
          migrations: [
            // path.join(
            //   process.cwd(),
            //   'dist',
            //   'src',
            //   'database',
            //   'migrations',
            //   '*.js',
            // ),
            'dist/src/database/migrations/*.ts',
          ],
          synchronize: false,
          migrationsRun: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class MysqlModule {}
