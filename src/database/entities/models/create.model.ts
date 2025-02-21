import { CreateDateColumn } from 'typeorm';

export class CreateModel {
  @CreateDateColumn()
  created: Date;
}
