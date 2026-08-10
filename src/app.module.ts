import { Module } from '@nestjs/common';
import { TarefasModule } from './tarefas/tarefas.module';
import { ProdutosModule } from './produtos/produtos.module';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [TarefasModule, ProdutosModule, ClientesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
