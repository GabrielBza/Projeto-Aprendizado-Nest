import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  contarTudo() {
    return this.dashboardService.contarTudo();
  }

  @Get('/tarefasPorStatus')
  tarefasPorStatus() {
    return this.dashboardService.tarefasPorStatus();
  }

  @Get('/produtosPorCategoria')
  produtosPorCategoria() {
    return this.dashboardService.produtosPorCategoria();
  }

  @Get('/clientesPorStatus')
  clientesPorStatus() {
    return this.dashboardService.clientesPorStatus();
  }
}
