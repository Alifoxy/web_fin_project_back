import { Module } from '@nestjs/common';
import { ClientsModule } from './modules/clients/clients.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { MysqlModule } from './modules/mysql/mysql.module';
import configuration from './configs/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ClientsModule,
    RepositoryModule,
    MysqlModule,
  ],
})
export class AppModule {}
