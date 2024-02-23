// localStorageUtil.ts

export interface Produto {
  nomeProduto: string;
  unidadeMedida: UnidadeMedida;
  quantidade: string;
  preco: string;
  produtoPerecivel: boolean;
  dataValidade?: string;
  dataFabricacao: string;
}

export enum UnidadeMedida {
  Litro = 'Litro',
  Quilograma = 'Quilograma',
  Unidade = 'Unidade',
}


export const getProdutosFromLocalStorage = (): Produto[] => {
  if (typeof window !== 'undefined') {
    const produtosJson = localStorage.getItem('produtos');
    return produtosJson ? JSON.parse(produtosJson) : [];
  }
  return [];
};

export const getProdutoFromLocalStorage = (nomeProduto: string): Produto | undefined => {
  if (typeof window !== 'undefined') {
    const produtosJson = localStorage.getItem('produtos');
    if (produtosJson) {
      const produtos: Produto[] = JSON.parse(produtosJson);
      return produtos.find(produto => produto.nomeProduto === nomeProduto);
    }
  }
  return undefined;
};

export const saveProdutoToLocalStorage = (produto: Produto): void => {
  if (typeof window !== 'undefined') {
    const produtosExistentes = getProdutosFromLocalStorage();
    const index = produtosExistentes.findIndex((p) => p.nomeProduto === produto.nomeProduto);

    if (index !== -1) {
      // Se o produto já existir, atualiza-o na lista
      produtosExistentes[index] = produto;
    } else {
      // Se o produto não existir, adiciona-o à lista
      produtosExistentes.push(produto);
    }

    localStorage.setItem('produtos', JSON.stringify(produtosExistentes));
  }
};

export const limparLocalStorage = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('produtos');
  }
};
