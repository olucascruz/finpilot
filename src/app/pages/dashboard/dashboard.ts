import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgClass, DecimalPipe, CommonModule } from '@angular/common';
import { ReceitaDespesa, ReceitaDespesaService } from '../../service/receita-despesa.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DecimalPipe,
    NgClass
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit, AfterViewInit {
  totalReceitas = 0;
  totalDespesas = 0;
  saldo = 0;

  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') barChartRef!: ElementRef<HTMLCanvasElement>;

  private lineChartInstance: Chart | null = null;
  private barChartInstance: Chart | null = null;

  private receitasPorDia: { [key: string]: number } = {};
  private receitasPorMes: { [key: string]: number } = {};

  constructor(private receitaDespesaService: ReceitaDespesaService) {}

  ngOnInit(): void {
    this.receitaDespesaService.listarLancamentos().subscribe((lancamentos: ReceitaDespesa[]) => {
      const receitas = lancamentos.filter(l => l.tipo === 'Receita');
      const despesas = lancamentos.filter(l => l.tipo === 'Despesa');

      this.totalReceitas = receitas.reduce((acc, atual) => acc + atual.valor, 0);
      this.totalDespesas = despesas.reduce((acc, atual) => acc + atual.valor, 0);
      this.saldo = this.totalReceitas - this.totalDespesas;

      this.receitasPorDia = this.agruparPorData(receitas);
      this.receitasPorMes = this.agruparPorMes(receitas);

      this.criarLineChart(); // se ViewChild já estiver carregado, mostra
      this.criarBarChart();
    });
  }

  ngAfterViewInit(): void {
    // Garante que cria os gráficos se os dados já chegaram
    if (Object.keys(this.receitasPorDia).length) this.criarLineChart();
    if (Object.keys(this.receitasPorMes).length) this.criarBarChart();
  }

  private agruparPorData(receitas: ReceitaDespesa[]) {
    const agrupado: { [data: string]: number } = {};
    receitas.forEach(r => {
      agrupado[r.data] = (agrupado[r.data] || 0) + r.valor;
    });
    return agrupado;
  }

  private agruparPorMes(receitas: ReceitaDespesa[]) {
    const agrupado: { [mes: string]: number } = {};
    receitas.forEach(r => {
      const mes = new Date(r.data).toLocaleString('pt-BR', { month: 'short', year: 'numeric' });
      agrupado[mes] = (agrupado[mes] || 0) + r.valor;
    });
    return agrupado;
  }

  private criarLineChart() {
    if (this.lineChartInstance) this.lineChartInstance.destroy();

    const ctx = this.lineChartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.lineChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Object.keys(this.receitasPorDia),
          datasets: [{
            label: 'Receita Diária',
            data: Object.values(this.receitasPorDia),
            borderColor: '#2196f3',
            backgroundColor: 'rgba(33,150,243,0.2)',
            fill: true
          }]
        }
      });
    }
  }

  private criarBarChart() {
    if (this.barChartInstance) this.barChartInstance.destroy();

    const ctx = this.barChartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.barChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(this.receitasPorMes),
          datasets: [{
            label: 'Receita por Mês',
            data: Object.values(this.receitasPorMes),
            backgroundColor: '#4caf50'
          }]
        }
      });
    }
  }
}
