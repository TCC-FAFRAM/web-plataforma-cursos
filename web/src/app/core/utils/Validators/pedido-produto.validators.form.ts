import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PedidoProdutoDTO } from '../../../dtos/pedido/pedido-produto.dto';

export function qtdeMaiorQueZero(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    return valor > 0 ? null : { preçoInvalido: { value: valor } };
  }; }

  export function precoMaiorQueZero(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valor = control.value;
      return valor > 0 ? null : { precoInvalido: { value: valor } };
    };
}

export function saldoEstoque({produtoQtde, produtoUnidade, produtoPesoDisponivel, produtoQtdeDisponivel, produtoNaoBloqueaEstoquePed }: PedidoProdutoDTO): ValidatorFn {
  const unidadeSelecionada = produtoUnidade; 
  const qtde = produtoQtde;
  let estoquePendente = 0;
  if(produtoNaoBloqueaEstoquePed !== 'S') {   
  if (unidadeSelecionada === 'KG' || unidadeSelecionada === 'TN') {
    estoquePendente = produtoPesoDisponivel! - qtde;
  } else {
    estoquePendente = produtoQtdeDisponivel! - qtde;
  }}

    return (): ValidationErrors | null => {
      return estoquePendente < 0 ? { error: 'Estoque abaixo do mínimo' } : null;
    };
}


export function pesoLiquido({produtoQtde, produtoUnidade,produtoPesoLiquido, produtoPesoMedio }: PedidoProdutoDTO): ValidatorFn {
  const unidadeSelecionada = produtoUnidade; 
  const pesoMedio = produtoPesoMedio === 0 ? produtoPesoLiquido : produtoPesoMedio;
  let bloqueio = false;
  if (unidadeSelecionada ==='KG' && produtoQtde < pesoMedio!) {
      bloqueio = true;
  }

    return (): ValidationErrors | null => {
      return bloqueio ? { error: `Minimo para KG é ${pesoMedio?.toFixed(2)}` } : null;
    };
}

