import { v4 as uuid } from 'uuid';

// o Model é a representação de como um dado é salvo dentro da aplicacação

class Appointment {
  id: string;

  provider: string;

  date: Date;

  // função para omitir um atributo da classe Omit<class>, 'atributo que quer omitir'
  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
