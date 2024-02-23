// ProductList.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Produto, getProdutosFromLocalStorage, limparLocalStorage } from '../utils/localStorageUtil';

const ProductList: React.FC = () => {
  const router = useRouter();

  // Estado para rastrear o produto sendo editado
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  // Carregar produtos do localStorage no carregamento inicial
  const [produtosLocais, setProdutosLocais] = useState<Produto[]>([]);

  useEffect(() => {
    const savedProducts = getProdutosFromLocalStorage();
    setProdutosLocais(savedProducts);
  }, []);

  // Função para lidar com a seleção e edição de um produto
  const handleEditProduct = (produto: Produto) => {
    setProdutoEditando(produto);
    router.push(`/EditProduct?nomeProduto=${encodeURIComponent(produto.nomeProduto)}`);
  };
  

  // Função para limpar o localStorage
  const handleCleanLocalStorage = () => {
    // Limpar o localStorage
    limparLocalStorage();
    // Atualizar a lista local de produtos
    setProdutosLocais([]);
    // Limpar a seleção do produto
    setProdutoEditando(null);
  };

  return (
    <div>
      <h2>Lista de Produtos</h2>
      <ul>
        {produtosLocais.map((produto, index) => (
          <li key={index}>
            <strong>{produto.nomeProduto}</strong>
            <p>Unidade de Medida: {produto.unidadeMedida}</p>
            <p>Quantidade: {produto.quantidade}</p>
            <p>Preço: {produto.preco}</p>
            <p>Perecível: {produto.produtoPerecivel ? 'Sim' : 'Não'}</p>
            {produto.produtoPerecivel && <p>Data de Validade: {produto.dataValidade}</p>}
            <p>Data de Fabricação: {produto.dataFabricacao}</p>
            {/* Botão de edição para cada produto */}
            <button onClick={() => handleEditProduct(produto)}>Editar este produto</button>
          </li>
        ))}
      </ul>
      {/* Botão para limpar o localStorage */}
      <button onClick={handleCleanLocalStorage}>Limpar LocalStorage</button>
    </div>
  );
};

export default ProductList;
