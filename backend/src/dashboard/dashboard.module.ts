import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TarefasModule } from '../tarefas/tarefas.module';
import { ClientesModule } from '../clientes/clientes.module';
import { ProdutosModule } from '../produtos/produtos.module';
import { PedidosModule } from '../pedidos/pedidos.module';

@Module({
  imports: [TarefasModule, ClientesModule, ProdutosModule, PedidosModule],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
