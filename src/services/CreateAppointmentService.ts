// O services vai armazenar toda a regra de negócio da api

import { startOfHour } from 'date-fns';
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
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
