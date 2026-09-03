import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './cliente.entity';
import { AuthModule } from '../auth/auth.module';

// Camada que vai interligar os diferentes arquivos da 'entidade' "Cliente".
@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntity]), AuthModule],
  providers: [ClientesService],
  controllers: [ClientesController],
  exports: [ClientesService],
})
export class ClientesModule {}
