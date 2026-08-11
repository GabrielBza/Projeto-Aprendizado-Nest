import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TarefaEntity } from './tarefa.entity';
import { TarefasService } from './tarefas.service';
import { TarefasController } from './tarefas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TarefaEntity])],
  providers: [TarefasService],
  controllers: [TarefasController],
})
export class TarefasModule {}
