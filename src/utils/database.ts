/*
 * @Author: jweboy
 * @Date: 2021-07-17 21:58:37
 * @LastEditors: jweboy
 * @LastEditTime: 2022-01-04 14:49:38
 */
import 'reflect-metadata';
import { createConnection, Connection, ConnectionOptions } from 'typeorm';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_TABLE, DB_TYPE } = process.env;

const defaultOptions: ConnectionOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_TABLE,
  synchronize: true,
  logging: ['error', 'schema'],
};

class Database {
  private connection: Connection;

  private options: ConnectionOptions;

  constructor(options: Partial<ConnectionOptions>) {
    // @ts-ignore
    this.options = { ...defaultOptions, ...options };
  }

  public async connect(): Promise<Connection> {
    if (this.connection) {
      await this.connection.connect();
      return this.connection;
    }

    this.connection = await createConnection(this.options);
    return this.connection;
  }
}

export default Database;
