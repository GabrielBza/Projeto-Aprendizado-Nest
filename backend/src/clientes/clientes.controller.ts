import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClienteEntity } from './cliente.entity';
import { CriarClienteDto } from './dtos/criar-cliente-dto';
import { AtualizarClienteDto } from './dtos/atualizar-cliente-dto';
import { ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { TipoUsuario } from '../usuarios/enums/tipo-usuario.enum';

// Controller de clientes. Camada que vai manter comunicação com as requisições HTTP, sendo responsável por processar requests e enviar responses.

@UseGuards(AuthGuard, RolesGuard)
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {} //Injeção de dependência do Service.

  // Anotação que indica um possivel envio de um atributo 'nome' para a realização de uma query.
  @ApiQuery({
    name: 'nome',
    required: false,
    type: String,
  })
  @Get() // Função de listagem que pode receber uma string. Caso não receba, retorna tudo, e caso receba, retorna clientes que possuem aquela string no nome.
  listar(@Query('nome') nome?: string): Promise<ClienteEntity[]> {
    return this.clientesService.listar(nome);
  }

  // Função de busca que utiliza o id do cliente pra retornar somente 1 cliente.

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number): Promise<ClienteEntity> {
    return this.clientesService.buscarPorId(id);
  }

  // Função que cria um novo cliente a partir dos dados recebidos.
  @Roles(TipoUsuario.ADMIN)
  @Post()
  criar(@Body() dados: CriarClienteDto): Promise<ClienteEntity> {
    return this.clientesService.criar(dados);
  }

  // Função de atualização que busca um cliente pelo seu id e modifica seus atributos pelos dados inseridos.
  @Roles(TipoUsuario.ADMIN)
  @Patch(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dados: AtualizarClienteDto,
  ): Promise<ClienteEntity> {
    return this.clientesService.atualizar(id, dados);
  }

  // Função que deleta o registro de um cliente a partir do seu id.
  @Roles(TipoUsuario.ADMIN)
  @Delete(':id')
  deletar(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.deletar(id);
  }
}
