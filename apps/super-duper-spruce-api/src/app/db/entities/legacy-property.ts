import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'properties'})
export class LegacyProperty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @Column({nullable: true, name: 'created_at'})
  createdAt?: Date;

  @Column({nullable: true, name: 'updated_at'})
  updatedAt?: Date;
}
