import styled from 'styled-components';
import { ModalComponent } from '../Modal';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useDeleteTransaction from '../../hooks/api/useDeleteTransaction';
import useAllUserTransactions from '../../hooks/api/useAllUserTransactions';
import { useEffect } from 'react';

export default function Transaction({ transaction, setUserRecords }) {
  const { deleteTransaction } = useDeleteTransaction();
  const { getAllUserTransactions } = useAllUserTransactions();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    updateTransactions();
  }, [update]);

  async function updateTransactions() {
    try {
      const result = await getAllUserTransactions();
      setUserRecords(result);
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
  }

  async function deleteUserTransaction() {
    setLoading(true);

    try {
      await deleteTransaction(transaction.id);
      setUpdate(!update);
      setLoading(false);
      setIsOpen(false);
      toast.success('Informações salvas com sucesso!');
    } catch (error) {
      setLoading(false);
      setIsOpen(false);
      toast.error('Não foi possível salvar suas informações!');
    }
  }

  return (
    <>
      <ModalComponent
        title="Deseja remover esse registro?"
        close="Cancelar"
        confirm="Continuar"
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        propsFunction={deleteUserTransaction}
        loading={loading}
      />
      <TransactionContainer>
        <TransactionInfo>
          <p>{transaction.ticker} </p>
        </TransactionInfo>
        <TransactionInfo>
          <p>{transaction.amount.toFixed(2).replace('.', ',')}</p>
        </TransactionInfo>
        <TransactionInfo>
          <p>R$ {(transaction.totalPrice / 100 / transaction.amount).toFixed(2).replace('.', ',')}</p>
        </TransactionInfo>
        <TransactionInfo>
          <p>R$ {(transaction.totalPrice / 100).toFixed(2).replace('.', ',')}</p>
        </TransactionInfo>
        <TransactionInfo>{transaction.status === 'BUY' ? <p>Compra</p> : <p> Venda</p>}</TransactionInfo>
        <DeleteContainer onClick={() => setIsOpen(true)}>
          <BsFillTrash3Fill />
        </DeleteContainer>
      </TransactionContainer>
    </>
  );
}

const TransactionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`;

const TransactionInfo = styled.div`
  width: 4rem;
  height: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;

  @media (min-width: 1024px) {
    font-size: 1.2rem;
    width: 7rem;
  }
`;

const DeleteContainer = styled.div`
  width: 1rem;
  height: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  cursor: pointer;

  @media (min-width: 1024px) {
    font-size: 1.2rem;
    width: 2rem;
  }
`;
