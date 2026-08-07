import { Module } from '@nestjs/common';
import { TarefasModule } from './tarefas/tarefas.module';

@Module({
  imports: [TarefasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
