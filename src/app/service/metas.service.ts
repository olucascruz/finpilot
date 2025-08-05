import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface MetaDados {
    categoria: 'Receita' | 'Despesa' | 'Lucro';
    valorMeta: number;
    valorRealizado: number;
    atingido: number; // em porcentagem
}

@Injectable({
    providedIn: 'root'
})
export class MetasService {
    private metas: MetaDados[] = [
        {
            categoria: 'Receita',
            valorMeta: 20000,
            valorRealizado: 18500,
            atingido: 92.5
        },
        {
            categoria: 'Despesa',
            valorMeta: 10000,
            valorRealizado: 9800,
            atingido: 98
        },
        {
            categoria: 'Lucro',
            valorMeta: 10000,
            valorRealizado: 8700,
            atingido: 77.5
        }
    ];

    listarMetas(): Observable<MetaDados[]> {
        return of(this.metas);
    }
}
