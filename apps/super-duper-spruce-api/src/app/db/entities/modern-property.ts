import { Column, Entity, PrimaryColumn } from 'typeorm';


@Entity({name: 'properties'})
export class ModernProperty {
  @PrimaryColumn({unique: true})
  id: string;

  @Column()
  name: string;

  @Column({name: 'legacy_id'})
  legacyId: number;

  @Column({name: 'is_live'})
  isLive: boolean;

  @Column({name: 'go_live_date'})
  goLiveDate: Date;

  @Column({name: 'numer_of_units'})
  numberOfUnits: number;
}
