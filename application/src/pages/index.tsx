// RegisterForm.tsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductForm from '../components/commons/ProductForm';
import { Produto, saveProdutoToLocalStorage, getProdutoFromLocalStorage } from '../utils/localStorageUtil';

interface RegisterFormProps {
  onSave: (produto: Produto) => void;
  onCancel: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSave, onCancel }) => {
  const router = useRouter();
  const { nomeProduto } = router.query;

  const [initialData, setInitialData] = useState<Produto | undefined>(undefined);

  useEffect(() => {
    const loadProductData = () => {
      if (nomeProduto && typeof nomeProduto === 'string') {
        const produto = getProdutoFromLocalStorage(nomeProduto);
        if (produto) {
          setInitialData(produto);
        } else {
          console.error(`Produto "${nomeProduto}" não encontrado.`);
        }
      }
    };

    loadProductData();
  }, [nomeProduto]);

  const handleSalvar = (produto: Produto) => {
    saveProdutoToLocalStorage(produto);
    router.push('/ProductList');
  };

  const handleCancelar = () => {
    router.push('/ProductList');
  };

  return (
    <div className="flex flex-col flex-shrink-0 items-center pt-10">
      <ProductForm
        initialData={initialData}
        onSave={handleSalvar}
        onCancel={handleCancelar}
      />
    </div>
  );
};

export default RegisterForm;
