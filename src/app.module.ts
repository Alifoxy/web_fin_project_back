import { Module } from '@nestjs/common';
import { ClientsModule } from './modules/clients/clients.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { MysqlModule } from './modules/mysql/mysql.module';
import configuration from './configs/configuration';
import { ConfigModule } from '@nestjs/config';
import { DevicesModule } from './modules/devices/devices.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ClientsModule,
    DevicesModule,
    RepositoryModule,
    MysqlModule,
  ],
})
export class AppModule {}
