import { Component, Inject, PLATFORM_ID, AfterViewInit, OnInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Chart } from 'chart.js/auto';
import { MetasService, MetaDados } from '../../service/metas.service';
import { MetasDialog } from './metas-dialog/metas-dialog';

@Component({
  selector: 'app-metas',
  standalone: true,
  templateUrl: './metas.html',
  styleUrls: ['./metas.scss'],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule
  ]
})
export class MetasVsRealizado implements OnInit, AfterViewInit {
  metas: (MetaDados & { icone: string })[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private metasService: MetasService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.carregarMetas();
  }

  ngAfterViewInit(): void {
    // gráfico depende de metas carregadas
  }

  carregarMetas(): void {
    this.metasService.listarMetas().subscribe((dados) => {
      this.metas = dados.map(meta => ({
        ...meta,
        icone:
          meta.categoria === 'Receita'
            ? 'trending_up'
            : meta.categoria === 'Despesa'
            ? 'money_off'
            : 'account_balance_wallet'
      }));

      this.gerarGrafico();
    });
  }

  gerarGrafico(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvas = document.getElementById('graficoMetas') as HTMLCanvasElement;
    if (!canvas) return;

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: this.metas.map(m => m.categoria),
        datasets: [
          {
            label: 'Meta',
            data: this.metas.map(m => m.valorMeta),
            backgroundColor: '#1976d2'
          },
          {
            label: 'Realizado',
            data: this.metas.map(m => m.valorRealizado),
            backgroundColor: '#4fc3f7'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  abrirFormularioNovaMeta(): void {
    const dialogRef = this.dialog.open(MetasDialog, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const novaMeta: MetaDados & { icone: string } = {
          ...result,
          icone:
            result.categoria === 'Receita'
              ? 'trending_up'
              : result.categoria === 'Despesa'
              ? 'money_off'
              : 'account_balance_wallet'
        };

        const indice = this.metas.findIndex(m => m.categoria === novaMeta.categoria);
        if (indice !== -1) {
          this.metas[indice] = novaMeta;
        } else {
          this.metas.push(novaMeta);
        }

        this.gerarGrafico();
      }
    });
  }

  abrirDetalhes(meta: MetaDados): void {
    console.log('Meta clicada:', meta);
  }

  getAlertasEspecificos(): { tipo: string, mensagem: string, cor: string, icone: string }[] {
    return this.metas
      .map(meta => {
        const diferenca = meta.valorRealizado - meta.valorMeta;
        const atingido = meta.atingido.toFixed(1);

        if (meta.categoria === 'Lucro') {
          if (diferenca < 0) {
            return {
              tipo: 'lucro-baixo',
              mensagem: `Meta de lucro abaixo do esperado (–R$ ${Math.abs(diferenca).toLocaleString()})`,
              cor: 'error',
              icone: 'error'
            };
          }
        }

        if (meta.categoria === 'Despesa') {
          if (meta.atingido > 120) {
            return {
              tipo: 'despesa-estourada',
              mensagem: `Meta de despesa estourada (${atingido}% atingido)`,
              cor: 'error',
              icone: 'error'
            };
          }
          if (meta.atingido > 100) {
            return {
              tipo: 'despesa-excedida',
              mensagem: `Meta de despesa excedida (${atingido}% atingido)`,
              cor: 'warning',
              icone: 'warning'
            };
          }
          if (meta.atingido >= 95) {
            return {
              tipo: 'despesa-alerta',
              mensagem: `Despesa quase no limite (${atingido}% atingido)`,
              cor: 'warning',
              icone: 'warning'
            };
          }
        }

        if (meta.categoria === 'Receita') {
          if (meta.atingido < 80) {
            return {
              tipo: 'receita-baixa',
              mensagem: `Receita abaixo do esperado (${atingido}% atingido)`,
              cor: 'info',
              icone: 'info'
            };
          }
          if (meta.atingido >= 120) {
            return {
              tipo: 'receita-otima',
              mensagem: `Receita superando expectativas (${atingido}% atingido)`,
              cor: 'success',
              icone: 'check_circle'
            };
          }
        }

        return null;
      })
      .filter((alerta): alerta is NonNullable<typeof alerta> => alerta !== null);
  }
}
