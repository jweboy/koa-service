/*
 * @Author: jweboy
 * @Date: 2020-01-22 16:29:31
 * @LastEditors: jweboy
 * @LastEditTime: 2020-11-08 23:55:20
 */
import 'reflect-metadata';
import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import dotenvFlow from 'dotenv-flow';
import Post from './post';
import AssetsDirectory from './assets/directories';

dotenvFlow.config();

// const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_TABLE, DB_TYPE } = process.env;

const DB_HOST = 'localhost';
const DB_USER = 'root';
const DB_PASSWORD = 'jl940630';
const DB_TABLE = 'pet';

const options: ConnectionOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: 3306,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_TABLE,
  synchronize: true,
  logging: ['error', 'schema'],
  entities: [Post, AssetsDirectory],
};

/*
 * @Author: jweboy
 * @Date: 2020-02-21 22:19:11
 * @LastEditors: jweboy
 * @LastEditTime: 2020-02-21 22:21:14
 */
class Database {
  private connection: Connection;

  public async connect(): Promise<Connection> {
    if (this.connection) {
      await this.connection.connect();
      return this.connection;
    }

    this.connection = await createConnection(options);
    return this.connection;
  }

  public getTable(repository) {
    return this.connection.getRepository(repository);
  }
}

const db = new Database();

export default db;
