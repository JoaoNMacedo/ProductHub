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
  
  export const saveProdutoToLocalStorage = (produto: Produto): void => {
    if (typeof window !== 'undefined') {
      const produtosExistentes = getProdutosFromLocalStorage();
      const novaListaDeProdutos = [...produtosExistentes, produto];
      localStorage.setItem('produtos', JSON.stringify(novaListaDeProdutos));
    }
  };
  
  export const limparLocalStorage = (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('produtos');
    }
  };
  