import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { saveProdutoToLocalStorage, Produto, UnidadeMedida } from '../utils/localStorageUtil';

interface RegisterFormProps {
  // Adicione tipos conforme necessário
}

const RegisterForm: React.FC<RegisterFormProps> = () => {
  const router = useRouter();



  const [nomeProduto, setNomeProduto] = useState<string>('');
  const [unidadeMedida, setUnidadeMedida] = useState(UnidadeMedida.Litro);
  const [quantidade, setQuantidade] = useState<string>('');
  const [preco, setPreco] = useState<string>('');
  const [produtoPerecivel, setProdutoPerecivel] = useState<boolean>(false);
  const [dataValidade, setDataValidade] = useState<string>('');
  const [dataFabricacao, setDataFabricacao] = useState<string>('');

  const handleSalvar = () => {
    // Criar objeto produto
    const produto: Produto = {
      nomeProduto,
      unidadeMedida,
      quantidade,
      preco,
      produtoPerecivel,
      dataValidade,
      dataFabricacao,
    };

    // Salvar no localStorage
    saveProdutoToLocalStorage(produto);

    // Redirecionar para a tela de listagem
    router.push('/ProductList');
  };

  const handleCancelar = () => {
    // Lógica para redirecionar para a tela de listagem
    router.push('/ProductList');
  };

  return (
    <div className="flex flex-col flex-shrink-0 items-center pt-10">
      <form className="cardcadastro flex flex-col justify-center items-center pt-[2.1875rem] pb-[2.1875rem] px-0 w-[599px] min-w-[580px] max-w-[815px] min-h-[520px] rounded-[50px] bg-[#d9d9d9]/[.40]">

        <div className="flex justify-center items-start self-stretch pt-2 pb-2 pl-8 pr-8 cadastro_de_produtos text-gray-800 text-center font-inter text-2xl font-bold leading-150%">
          Cadastro de produtos
        </div>

        <div className="flex space-x-4 flex-row justify-center">
          <label className="flex flex-col justify-center self-stretch text-black font-['Inter'] text-base font-semibold leading-[150%]">
            Nome do produto:
          </label>
          <input
            className="self-stretch rounded-[0.625rem] border border-[#000000]/[.90] bg-[#e7ecea]"
            type="text"
            value={nomeProduto}
            onChange={(e) => setNomeProduto(e.target.value)}
            id="nomeProduto"
          />
        </div>

        <div className="flex space-x-4 flex-row justify-center">
          <label className="flex flex-col justify-center self-stretch text-black font-['Inter'] text-base font-semibold leading-[150%]">
            Unidade de medida:
          </label>
          <select
            className="self-stretch rounded-[0.625rem] border border-[#000000]/[.90] bg-[#e7ecea]"
            value={unidadeMedida}
            onChange={(e) => {
              const selectedUnidadeMedida = e.target.value as UnidadeMedida;
              setUnidadeMedida(selectedUnidadeMedida);
              setQuantidade("");
            }}
            id="unidadeMedida"
          >
            <option value="Litro">Litro (lt)</option>
            <option value="Quilograma">Quilograma (kg)</option>
            <option value="Unidade">Unidade (un)</option>
          </select>
        </div>

        <div className="flex space-x-4 flex-row justify-center">
          <label className="flex flex-col justify-center self-stretch text-black font-['Inter'] text-base font-semibold leading-[150%]">
            Quantidade:
          </label>
          <input
            className="self-stretch rounded-[0.625rem] border border-[#000000]/[.90] bg-[#e7ecea]"
            type="text"
            value={quantidade}
            onChange={(e) => {
              const inputValue = e.target.value;

              // Aplicar regras da unidade de medida
              switch (unidadeMedida) {
                case "Litro":
                  // Permitir somente números com até 3 casas decimais
                  const validValueLitro = inputValue.replace(/[^0-9.]/g, '').slice(0, 5); // Máximo de 3 dígitos decimais + 1 dígito inteiro
                  setQuantidade(`${validValueLitro} lt`);
                  break;
                case "Quilograma":
                  // Permitir somente números com até 3 casas decimais
                  const validValueQuilograma = inputValue.replace(/[^0-9.]/g, '').slice(0, 5); // Máximo de 3 dígitos decimais + 1 dígito inteiro
                  setQuantidade(`${validValueQuilograma} kg`);
                  break;
                case "Unidade":
                  // Permitir somente números inteiros
                  const validValueUnidade = inputValue.replace(/[^0-9]/g, '');
                  setQuantidade(`${validValueUnidade} un`);
                  break;
                default:
                  setQuantidade(inputValue);
              }
            }}
            id="quantidade"
          />
        </div>

        <div className="flex space-x-4 flex-row justify-center">
          <label className="flex flex-col justify-center self-stretch text-black font-['Inter'] text-base font-semibold leading-[150%]">
            Preço:
          </label>
          <input
            className="self-stretch rounded-[0.625rem] border border-[#000000]/[.90] bg-[#e7ecea]"
            type="text"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            id="preco"
          />
        </div>

        <div className="flex space-x-4 flex-row justify-center">
          <label className="flex flex-col justify-center self-stretch text-black font-['Inter'] text-base font-semibold leading-[150%]">
            Produto perecível:
          </label>
          <input
            className="w-5"
            type="checkbox"
            checked={produtoPerecivel}
            onChange={() => setProdutoPerecivel(!produtoPerecivel)}
            id="produtoPerecivel"
          />
        </div>

        {produtoPerecivel && (
          <div className="flex space-x-4 flex-row justify-center">
            <label className="flex flex-col justify-center self-stretch text-black font-['Inter'] text-base font-semibold leading-[150%]">Data de validade:</label>
            <input
              className="self-stretch rounded-[0.625rem] border border-[#000000]/[.90] bg-[#e7ecea]"
              type="date"
              value={dataValidade}
              onChange={(e) => setDataValidade(e.target.value)}
              id="dataValidade"
            />
          </div>
        )}

        <div className="flex space-x-4 flex-row justify-center">
          <label className="flex flex-col justify-center self-stretch text-black font-['Inter'] text-base font-semibold leading-[150%]">
            Data de fabricação:
          </label>
          <input
            className="self-stretch rounded-[0.625rem] border border-[#000000]/[.90] bg-[#e7ecea]"
            type="date"
            value={dataFabricacao}
            onChange={(e) => setDataFabricacao(e.target.value)}
            id="dataFabricacao"
          />
        </div>

        <div className="flex gap-2 mt-4">
          <button
            className="bg-green-500 text-white p-2 rounded cursor-pointer"
            onClick={handleSalvar}
          >
            Salvar
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded cursor-pointer"
            onClick={handleCancelar}
          >
            Cancelar
          </button>
        </div>

      </form>
    </div>
  );
};

export default RegisterForm;
