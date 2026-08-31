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
      toolbar: {
        show: false,
      },
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

  // FUNÇÕES

  ngOnInit(): void {
    this.carregarContadores();
    this.carregarTarefasPorStatus();
    this.carregarProdutosPorCategoria();
    this.carregarClientesPorStatus();
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
}
