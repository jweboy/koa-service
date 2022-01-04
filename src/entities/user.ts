/*
 * @Author: jweboy
 * @Date: 2020-02-20 22:51:38
 * @LastEditors: jweboy
 * @LastEditTime: 2021-12-04 17:20:38
 */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @CreateDateColumn()
  create_date: Date;
}

export default User;
