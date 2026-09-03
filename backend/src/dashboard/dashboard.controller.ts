import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
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

  @Get('/topClientesPorPedido')
  top3CategoriasMaisPedidas() {
    return this.dashboardService.top3CategoriasMaisPedidas();
  }

  @Get('/pedidosPorTipoCliente')
  pedidosPorTipoCliente() {
    return this.dashboardService.pedidosPorTipoCliente();
  }

  @Get('/mediaUnidadesPorPedido')
  mediaUnidadesPorPedido() {
    return this.dashboardService.mediaUnidadesPorPedido();
  }
}
