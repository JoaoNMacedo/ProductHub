// Importe as dependências necessárias
import React, { useState } from 'react';
import ProductList from './ProductList';
import ProductForm from '../components/commons/ProductForm';
import { Produto, getProdutosFromLocalStorage, limparLocalStorage } from '../utils/localStorageUtil';

// Defina a sua página ProductList
const ProductListPage: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>(getProdutosFromLocalStorage());
  const [editingProduct, setEditingProduct] = useState<Produto | null>(null);

  const handleEdit = (produto: Produto) => {
    setEditingProduct(produto);
  };

  const handleSaveEdit = (editedProduct: Produto) => {
    // Atualize o produto na lista
    const updatedProducts = produtos.map((product) =>
      product === editingProduct ? editedProduct : product
    );

    // Salve a lista atualizada no localStorage
    // Substitua saveProdutoToLocalStorage pelo seu método correspondente
    // (que deve atualizar o produto específico no armazenamento local)
    // Exemplo: saveProdutoToLocalStorage(editedProduct);
    // ...

    // Atualize o estado dos produtos
    setProdutos(updatedProducts);

    // Limpe o estado de edição
    setEditingProduct(null);
  };

  const handleCancelEdit = () => {
    // Limpe o estado de edição
    setEditingProduct(null);
  };

  const handleClean = () => {
    // Limpe o localStorage
    limparLocalStorage();

    // Limpe o estado dos produtos
    setProdutos([]);
  };

  return (
    <div>
      {/* Renderize o formulário de edição se houver um produto em edição */}
      {editingProduct && (
        <ProductForm
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          initialData={editingProduct}
        />
      )}

      {/* Renderize a lista de produtos */}
      <ProductList produtos={produtos} onEdit={handleEdit} />

      {/* Adicione um botão para limpar o localStorage */}
      <button onClick={handleClean}>Limpar localStorage</button>
    </div>
  );
};

export default ProductListPage;
