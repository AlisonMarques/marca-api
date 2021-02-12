import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// o Model é a representação de como um dado é salvo dentro da aplicacação

// indicando qual entidade(tabela) vai ser salva com @Entity
@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;
