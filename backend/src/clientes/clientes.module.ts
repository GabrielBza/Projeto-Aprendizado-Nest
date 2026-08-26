import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './cliente.entity';

// Camada que vai interligar os diferentes arquivos da 'entidade' "Cliente".
@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntity])],
  providers: [ClientesService],
  controllers: [ClientesController],
})
export class ClientesModule {}
