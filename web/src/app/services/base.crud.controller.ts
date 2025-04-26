import { FormBuilder, FormGroup } from '@angular/forms';
import { inject, signal } from '@angular/core';
import {  HttpParamsOptions } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertService } from '../core/ui/components/alert/alert.component.service';

// Tipo que representa a resposta paginada esperada
export interface PagedResult<T> {
  data: T[];
  total: number;
}

interface Error{
  error: {
    error: string
  }
}

// Serviço CRUD com retorno paginado
export interface CrudService<T> {
  getAll: (query: HttpParamsOptions) => Observable<PagedResult<T>>;
  create: (data: T) => Observable<T>;
  update: (data: T, id: number) => Observable<T>;
  delete: (id: number) => Observable<T>;
}

// Controller base com paginação
export abstract class BaseController<T> {
  items = signal<T[]>([]);
  loading = signal(false);
  total = signal(0);
  take = signal(10);
  skip = signal(0);
  search = signal('');
  activeEdit = signal(false);
  id = signal(0)

  form!: FormGroup;

  protected readonly alertService = inject(AlertService);

  constructor(
    protected fb: FormBuilder,
    protected service: CrudService<T>,
    protected idField: keyof T
  ) { }

  carregar(): void {
    this.loading.set(true);

    const queryParams: HttpParamsOptions = {
      fromObject: {
        take: this.take().toString(),
        skip: this.skip().toString(),
        search: this.search()
      }
    };

    this.service.getAll(queryParams).subscribe({
      next: (res: PagedResult<T>) => {
        this.items.set(res.data);
        this.total.set(res.total);
      },
      error: (err: Error) => {this.logError('carregar itens', err)

      },
      complete: () => this.loading.set(false),
    });
  }

  onPageChange(page: number): void {
    this.skip.set((page - 1) * this.take());
    this.carregar();
  }

  salvar(item: T): void {
    this.service.create(item).subscribe({
      next: () => {
        this.alertService.show('Registro criado com sucesso!', 'success');
        this.carregar();
      },
      error: (err: Error) => {
        this.logError('criar', err);

      },
    });
  }

  atualizar(item: T): void {
    this.id.set(item[this.idField] as unknown as number);
    this.service.update(item, this.id()).subscribe({
      next: () => {
        this.alertService.show('Registro atualizado com sucesso!', 'success');
        this.carregar();
      },
      error: (err: Error) => {this.logError('atualizar', err)

      },
    });
  }

  deletar(id: number): void {
    this.service.delete(id).subscribe({
      next: () => {
        this.alertService.show('Registro deletado com sucesso!', 'success');
        this.carregar();
      },
      error: (err: Error) => {
        this.logError('deletar', err)
        console.log(err);

      },
    });
  }

  protected logError(acao: string, err: Error): void {
    const msg = err.error.error != undefined  ? err.error.error : 'Erro inesperado';
    this.alertService.show(`Erro ao ${acao}: ${msg}`, 'error');
    console.error(`Erro ao ${acao}:`, msg);
  }

  abstract buildForm(): FormGroup;
}
