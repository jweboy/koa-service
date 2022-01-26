/*
 * @Author: jweboy
 * @Date: 2021-06-13 18:18:49
 * @LastEditors: jweboy
 * @LastEditTime: 2022-01-26 14:22:40
 */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
class Coupons {
  @PrimaryGeneratedColumn() //  自
  id: number;

  @Column({ length: 20 })
  appId: string;

  @Column({ length: 300 })
  image: string;

  @Column({ length: 300 })
  jumpUrl: string;

  @CreateDateColumn()
  createDate: Date;
}

export default Coupons;
