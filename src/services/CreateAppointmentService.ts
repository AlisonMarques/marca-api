// O services vai armazenar toda a regra de negócio da api
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * 3 Problemas
 * [x]Recebimento das informações
 * [x]Tratativa de erros/excessões
 * [x]Acesso ao repositório
 */

interface RequestDTO {
  provider: string;
  date: Date;
}
/**
 * Dependency Inversion (SOLID)
 * PARA NAO PRECISAR INSTANCIAR VARIAS VEZES A MESMA CLASSE
 */

class CreateAppointmentService {
  // Regras de negócio

  public async execute({ provider, date }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    // salvando no banco de dados
    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
