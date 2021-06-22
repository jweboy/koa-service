/*
 * @Author: jweboy
 * @Date: 2021-06-13 18:18:49
 * @LastEditors: jweboy
 * @LastEditTime: 2021-06-20 21:28:30
 */
/*
 * @Author: jweboy
 * @Date: 2020-02-20 22:51:38
 * @LastEditors: jweboy
 * @LastEditTime: 2020-03-14 17:05:00
 */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
class Coupon {
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

export default Coupon;
