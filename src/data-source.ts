import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Publisher } from './entity/Publisher';
import { Domain } from './entity/Domain';
import mysql from 'mysql2/promise';

const databaseName = 'browsi';

export async function initializeDataBase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
  await connection.end();
}

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "", 10) || 3306,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: databaseName,
  synchronize: true,
  logging: false,
  entities: [Domain, Publisher],
  migrations: [],
  subscribers: []
});
