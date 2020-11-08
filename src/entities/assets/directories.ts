/*
 * @Author: jweboy
 * @Date: 2020-11-07 21:56:40
 * @LastEditors: jweboy
 * @LastEditTime: 2020-11-07 21:58:20
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class AssetsDirectory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  name: string;
}

export default AssetsDirectory;
