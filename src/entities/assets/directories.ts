/*
 * @Author: jweboy
 * @Date: 2020-11-07 21:56:40
 * @LastEditors: jweboy
 * @LastEditTime: 2020-11-15 12:03:05
 */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class AssetsDirectory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;

  @CreateDateColumn()
  createAt: Date;
}

export default AssetsDirectory;
