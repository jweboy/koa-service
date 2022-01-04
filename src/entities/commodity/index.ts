/*
 * @Author: jweboy
 * @Date: 2021-06-13 18:18:49
 * @LastEditors: jweboy
 * @LastEditTime: 2022-01-04 15:42:07
 */
/*
 * @Author: jweboy
 * @Date: 2020-02-20 22:51:38
 * @LastEditors: jweboy
 * @LastEditTime: 2020-03-14 17:05:00
 */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated } from 'typeorm';

export enum CommodityStatus {
  OFF_SHELF,
  PUT_ON,
}

@Entity()
class Commodity {
  @PrimaryGeneratedColumn() //  自递增
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ length: 20 })
  name: string;

  // @Column({ length: 100, default: null })
  // image_url: string;

  @Column()
  count: number;

  @Column({
    type: 'enum',
    enum: CommodityStatus,
    default: CommodityStatus.OFF_SHELF,
  })
  status: CommodityStatus;

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  update_date: Date;
}

export default Commodity;
