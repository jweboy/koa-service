import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
class Signin {
  @PrimaryGeneratedColumn()
  id: number;

  /** 新增积分 */
  @Column()
  incr_point: number;

  /** 合计积分 */
  @Column()
  sum_point: number;

  @UpdateDateColumn()
  update_time: Date;
}

export default Signin;
