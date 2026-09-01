import { Component, OnInit, signal } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexNonAxisChartSeries,
  ApexLegend,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexPlotOptions,
  NgApexchartsModule,
} from 'ng-apexcharts';

import { DashboardService } from '../../services/dashboard';
import { Contador } from '../../models/dashboard/contador';

@Component({
  selector: 'app-dashboard',
  imports: [NgApexchartsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardPage implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  contadores = signal<Contador[]>([]);

  // GRÁFICOS

  graficoTarefasPorStatus = {
    chart: {
      type: 'pie',
      height: 300,
    } as ApexChart,

    colors: ['rgb(159, 29, 29)', 'rgb(194, 144, 86)', 'rgb(2, 98, 65)'],

    title: {
      text: 'Tarefas por Status',
      align: 'center',
    } as ApexTitleSubtitle,

    plotOptions: {
      pie: {
        dataLabels: {
          offset: -15,
        },
      },
    } as ApexPlotOptions,

    legend: {
      position: 'bottom',
    } as ApexLegend,
  };

  seriesTarefasPorStatus = signal<ApexNonAxisChartSeries>([]);
  labelsTarefasPorStatus = signal<string[]>([]);

  graficoProdutosPorCategoria = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: {
        show: false,
      },
    } as ApexChart,

    plotOptions: {
      bar: {
        horizontal: true,
      },
    } as ApexPlotOptions,

    title: {
      text: 'Produtos por Categoria',
      align: 'center',
    } as ApexTitleSubtitle,
  };

  seriesProdutosPorCategoria = signal<ApexAxisChartSeries>([]);

  xaxisProdutosPorCategoria = signal<ApexXAxis>({
    categories: [],
  });

  graficoClientePorStatus = {
    chart: {
      type: 'donut',
      height: 300,
      toolbar: {
        show: false,
      },
    } as ApexChart,

    title: {
      text: 'Clientes por Status',
      align: 'center',
    } as ApexTitleSubtitle,

    legend: {
      position: 'bottom',
    } as ApexLegend,
  };

  seriesClientePorStatus = signal<ApexNonAxisChartSeries>([]);
  labelsClientePorStatus = signal<string[]>([]);
  coresClientePorStatus = signal<string[]>([]);

  graficoTop3Categorias = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: {
        show: false,
      },
    } as ApexChart,

    plotOptions: {
      bar: {
        horizontal: true,
      },
    } as ApexPlotOptions,

    title: {
      text: 'Top 3 categorias com mais pedidos',
      align: 'center',
    } as ApexTitleSubtitle,
  };

  seriesTop3Categorias = signal<ApexAxisChartSeries>([]);

  xaxisTop3Categorias = signal<ApexXAxis>({
    categories: [],
  });

  graficoPedidosPorTipoCliente = {
    chart: {
      type: 'pie',
      height: 300,
    } as ApexChart,

    colors: ['rgb(255, 174, 0)', 'rgb(0, 28, 26)', 'rgb(126, 76, 0);'],

    title: {
      text: 'Pedidos por tipo de cliente',
      align: 'center',
    } as ApexTitleSubtitle,

    plotOptions: {
      pie: {
        dataLabels: {
          offset: -15,
        },
      },
    } as ApexPlotOptions,

    legend: {
      position: 'bottom',
    } as ApexLegend,
  };

  seriesPedidosPorTipoCliente = signal<ApexNonAxisChartSeries>([]);
  labelsPedidosPorTipoCliente = signal<string[]>([]);

  graficoMediaUnidadesPorPedido = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: {
        show: false,
      },
    } as ApexChart,

    title: {
      text: 'Média de Unidades por Pedido',
      align: 'center',
    } as ApexTitleSubtitle,
  };

  seriesMediaUnidadesPorPedido = signal<ApexAxisChartSeries>([]);

  xaxisMediaUnidadesPorPedido = signal<ApexXAxis>({
    categories: [],
  });

  // FUNÇÕES

  ngOnInit(): void {
    this.carregarContadores();
    this.carregarTarefasPorStatus();
    this.carregarProdutosPorCategoria();
    this.carregarClientesPorStatus();
    this.carregarTop3Categorias();
    this.carregarPedidosPorTipoCliente();
    this.carregarMediaUnidadesPorPedido();
  }

  carregarContadores() {
    this.dashboardService.contarTudo().subscribe({
      next: (contadores) => {
        this.contadores.set(contadores);
      },

      error: (erro) => {
        console.error('Não foi possível buscar contadores', erro);
      },
    });
  }

  // Gráficos - Entidades X Marcadores

  carregarTarefasPorStatus() {
    this.dashboardService.tarefasPorStatus().subscribe({
      next: (quantidades) => {
        this.montarGraficoTarefasPorStatus(quantidades);
      },

      error: (erro) => {
        console.error('Não foi possível buscar as tarefas por status', erro);
      },
    });
  }

  montarGraficoTarefasPorStatus(tarefas: Contador[]) {
    this.seriesTarefasPorStatus.set(tarefas.map((tarefa) => tarefa.quantidade));

    this.labelsTarefasPorStatus.set(tarefas.map((tarefa) => tarefa.nome));
  }

  carregarProdutosPorCategoria() {
    this.dashboardService.produtosPorCategoria().subscribe({
      next: (contadores) => {
        this.montarGraficoProdutosPorCategoria(contadores);
      },

      error: (erro) => {
        console.error('Não foi possível buscar os produtos por categoria', erro);
      },
    });
  }

  montarGraficoProdutosPorCategoria(contadores: Contador[]) {
    const maiorQuantidade = Math.max(...contadores.map((produto) => produto.quantidade));

    this.seriesProdutosPorCategoria.set([
      {
        name: 'Produtos',
        data: contadores.map((produto) => produto.quantidade),
      },
    ]);

    this.xaxisProdutosPorCategoria.set({
      categories: contadores.map((produto) => produto.nome),
      max: maiorQuantidade + 1,
    });
  }

  carregarClientesPorStatus() {
    this.dashboardService.clientesPorStatus().subscribe({
      next: (contadores) => {
        this.montarGraficoClientesPorStatus(contadores);
      },

      error: (erro) => {
        console.error('Não foi possível buscar os clientes por status', erro);
      },
    });
  }

  montarGraficoClientesPorStatus(contadores: Contador[]) {
    this.seriesClientePorStatus.set(contadores.map((cliente) => cliente.quantidade));

    this.labelsClientePorStatus.set(contadores.map((cliente) => cliente.nome));

    this.coresClientePorStatus.set(
      contadores.map((cliente) => this.corClientePorStatus(cliente.nome)),
    );
  }

  corClientePorStatus(status: string): string {
    if (status === 'ATIVO') {
      return 'rgb(2, 98, 65)';
    }

    if (status === 'INATIVO') {
      return 'rgb(159, 29, 29)';
    }

    return 'rgb(128, 128, 128)';
  }

  carregarTop3Categorias() {
    this.dashboardService.top3CategoriasMaisPedidas().subscribe({
      next: (contadores) => {
        this.montarGraficoTop3Categorias(contadores);
      },

      error: (erro) => {
        console.error('Não foi possível buscar o top3 mais vendidos', erro);
      },
    });
  }

  montarGraficoTop3Categorias(contadores: Contador[]) {
    this.seriesTop3Categorias.set([
      {
        name: 'Pedidos',
        data: contadores.map((categoria) => categoria.quantidade),
      },
    ]);

    this.xaxisTop3Categorias.set({
      categories: contadores.map((categoria) => categoria.nome),
    });
  }

  carregarPedidosPorTipoCliente() {
    this.dashboardService.pedidosPorTipoCliente().subscribe({
      next: (tipos) => {
        this.montarGraficoPedidosPorTipoCliente(tipos);
      },
      error: (erro) => {
        console.error('Não foi possível reunir os pedidos e as categorias', erro);
      },
    });
  }

  montarGraficoPedidosPorTipoCliente(contadores: Contador[]) {
    this.labelsPedidosPorTipoCliente.set(contadores.map((tipo) => tipo.nome));
    this.seriesPedidosPorTipoCliente.set(contadores.map((tipo) => tipo.quantidade));
  }

  carregarMediaUnidadesPorPedido() {
    this.dashboardService.mediaUnidadesPorPedido().subscribe({
      next: (medias) => {
        this.montarGraficoMediaUnidadesPorPedido(medias);
      },
      error: (erro) => {
        console.error('Não foi possível carregar as médias', erro);
      },
    });
  }

  montarGraficoMediaUnidadesPorPedido(contadores: Contador[]) {
    this.seriesMediaUnidadesPorPedido.set([
      {
        name: 'Pedidos',
        data: contadores.map((contador) => contador.quantidade),
      },
    ]);
    this.xaxisMediaUnidadesPorPedido.set({
      categories: contadores.map((contador) => contador.nome),
    });
  }
}
