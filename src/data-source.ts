import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Publisher } from './entity/Publisher';
import { Domain } from './entity/Domain';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: 'browsi',
  synchronize: true,
  logging: false,
  entities: [Domain, Publisher],
  migrations: [],
  subscribers: []
});
