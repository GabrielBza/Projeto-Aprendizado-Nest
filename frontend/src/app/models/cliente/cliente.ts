import { StatusCliente } from '../../enums/clientes/status-cliente.enum';
import { TipoCliente } from '../../enums/clientes/tipo-cliente.enum';

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  idade: number;
  tipo: TipoCliente;
  status: StatusCliente;
}
