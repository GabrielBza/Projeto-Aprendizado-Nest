import { Module } from '@nestjs/common';
import { TarefasModule } from './tarefas/tarefas.module';
import { ProdutosModule } from './produtos/produtos.module';

@Module({
  imports: [TarefasModule, ProdutosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
