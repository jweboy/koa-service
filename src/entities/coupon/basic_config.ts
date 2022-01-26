import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/*
 * @Author: jweboy
 * @Date: 2022-01-26 11:40:14
 * @LastEditors: jweboy
 * @LastEditTime: 2022-01-26 15:11:55
 */

enum Switch {
  Close,
  Open,
}

@Entity()
export class CouponBasicConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Switch, default: Switch.Open })
  redEnvelopSwitch: Switch;

  @Column({ type: 'enum', enum: Switch, default: Switch.Close })
  couponSwitch: Switch;
}
