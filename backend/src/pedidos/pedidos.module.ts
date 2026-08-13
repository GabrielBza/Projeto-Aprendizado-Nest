import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { ProdutoEntity } from '../produtos/produto.entity';
import { ClienteEntity } from '../clientes/cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PedidoEntity, ProdutoEntity, ClienteEntity]),
  ],
  providers: [PedidosService],
  controllers: [PedidosController],
})
export class PedidosModule {}
