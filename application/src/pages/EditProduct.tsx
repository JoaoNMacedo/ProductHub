// EditProduct.tsx
import React from 'react';
import { Produto } from '../utils/localStorageUtil';
import ProductForm from '../components/commons/ProductForm';

interface EditProductProps {
  produto: Produto;
  onSave: (produtoEditado: Produto) => void; // Corrigido para receber produto editado
  onCancel: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ produto, onSave, onCancel }) => {
  const handleSalvar = (produtoEditado: Produto) => {
    onSave(produtoEditado); // Chama a função onSave para salvar o produto editado
  };

  return (
    <div>
      <h2>Editar Produto</h2>
      <div>
        <h3>Formulário de Edição</h3>
        <ProductForm
          initialData={produto}
          onSave={handleSalvar} // Passa a função de salvar produto editado
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};

export default EditProduct;
