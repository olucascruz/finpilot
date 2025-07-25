import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core'
import { Navbar } from '../navbar/navbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [Navbar, MatButtonModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  @ViewChildren('plane1, plane2, plane3, plane4', { read: ElementRef })
  planes!: QueryList<ElementRef>;
  functions = [
    { name: 'Dashboard', link:'dashboard'},
    { name: 'Pedidos', link:'pedidos'},
    { name: 'Receitas & Despesas', link:'receita'},
    { name: 'Metas', link:''},
    { name: 'Contas bancárias', link:''},

  ];
  private startTime: number | null = null;
  private screenWidth = 0;

  private offsets: { base: number, phase: number }[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}

  navigateTo(path: string) {
    console.log(path)
    this.router.navigate([path]);
  }

  ngAfterViewInit() {
   if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;

      // gera offsets aleatórios para cada avião
      this.offsets = this.planes.toArray().map(() => ({
        base: 50 + Math.random() * 300,              // altura base aleatória
        phase: Math.random() * Math.PI * 2           // fase inicial aleatória
      }));

      requestAnimationFrame(this.animate.bind(this));
    }
  }

  private animate(time: number) {
  if (!this.startTime) this.startTime = time;
    const elapsed = (time - this.startTime) / 1000;

    const larguraTotal = this.screenWidth + 200;

    this.planes.forEach((planeRef, index) => {
      const plane = planeRef.nativeElement as HTMLElement;
      const speed = 80 + index * 20;       // velocidade horizontal
      const amplitude = 50 + index * 10;   // variação vertical
      const freq = 2 + index * 0.2;        // frequência diferente

      const { base, phase } = this.offsets[index];

      // movimento horizontal com looping
      const x = (elapsed * speed) % larguraTotal - 150;

      // movimento vertical: seno + cosseno
      const angleBase = (elapsed + phase);
      const y = base
        + amplitude * Math.sin(angleBase * freq)
        + (amplitude / 2) * Math.cos(angleBase * (freq / 2));

      // velocidade vertical aproximada (derivada)
      const dy = amplitude * freq * Math.cos(angleBase * freq)
               - (amplitude / 2) * (freq / 2) * Math.sin(angleBase * (freq / 2));

      // rotação baseada na inclinação
      const rotation = Math.atan2(dy, speed) * (180 / Math.PI);
  
    // Aplica transformação
    plane.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
  });

    requestAnimationFrame(this.animate.bind(this));
  }
}
