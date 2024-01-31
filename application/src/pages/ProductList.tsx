
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Produto, getProdutosFromLocalStorage,limparLocalStorage } from '../utils/localStorageUtil';

interface ProductListProps {
    produtos: Produto[];
    onEdit: (produto: Produto) => void; 
  }

const ProductList: React.FC<ProductListProps> = ({ produtos }) => {
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
    };
  
    // Função para navegar até a página de edição
    const navigateToEditPage = () => {
      // Certifique-se de que há um produto selecionado antes de navegar
      if (produtoEditando) {
        // Navegue para a página de edição com o ID ou outro identificador único do produto
        router.push(`/EditProduct/${produtoEditando.nomeProduto}`);
      }
    };
  
    // Função para limpar o localStorage
    const handleCleanLocalStorage = () => {
      // Limpar o localStorage
      limparLocalStorage();
      // Atualizar a lista local de produtos
      setProdutosLocais([]);
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
              <button onClick={() => handleEditProduct(produto)}>Editar</button>
            </li>
          ))}
        </ul>
        {/* Botão para navegar até a página de edição */}
        <button onClick={navigateToEditPage}>Editar Produto Selecionado</button>
        {/* Botão para limpar o localStorage */}
        <button onClick={handleCleanLocalStorage}>Limpar LocalStorage</button>
      </div>
    );
  };
  
  export default ProductList;