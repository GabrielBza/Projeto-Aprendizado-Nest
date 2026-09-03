import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TarefaEntity } from './tarefa.entity';
import { TarefasService } from './tarefas.service';
import { TarefasController } from './tarefas.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TarefaEntity]), AuthModule],
  providers: [TarefasService],
  controllers: [TarefasController],
  exports: [TarefasService],
})
export class TarefasModule {}
