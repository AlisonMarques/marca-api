import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

// O repositorie é a parte que vai trabalhar com os dados vindo do model
// Listar, Criar, Atualizar, Deletar (CRUD)

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    // verificando se há dois agendamentos feito na mesma data e hora
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;
