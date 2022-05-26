import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  UpdateQueryBuilder,
} from 'typeorm';

@Entity()
class Project {
  @Column()
  @Generated('uuid')
  id: number;

  @PrimaryColumn()
  repo_url: string;

  @Column()
  application: string;

  @CreateDateColumn()
  create_date: Date;

  @UpdateDateColumn()
  update_date: Date;

  @Column({ length: 100 })
  remark: string;
}

export default Project;
