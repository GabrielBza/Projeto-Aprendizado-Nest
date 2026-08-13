import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

import { TarefasModule } from './tarefas/tarefas.module';
import { ProdutosModule } from './produtos/produtos.module';
import { ClientesModule } from './clientes/clientes.module';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  imports: [
    TarefasModule,
    ProdutosModule,
    ClientesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    PedidosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
