import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CouponBasicConfig } from './basic_config';
import Coupons from './coupons';

/*
 * @Author: jweboy
 * @Date: 2022-01-26 14:17:20
 * @LastEditors: jweboy
 * @LastEditTime: 2022-01-26 14:50:57
 */

@Entity()
class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => CouponBasicConfig)
  @JoinColumn({ name: 'config_id' })
  config: CouponBasicConfig;

  @OneToOne(() => Coupons)
  @JoinColumn({ name: 'items_id' })
  items: Coupons[];
}

export default Coupon;
