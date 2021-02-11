import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

// O repositorie é a parte que vai trabalhar com os dados vindo do model
// Listar, Criar, Atualizar, Deletar (CRUD)

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}
class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    // verificando se há dois agendamentos feito na mesma data e hora
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  // Exemplo de DTO (Data Transfer Object)
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
