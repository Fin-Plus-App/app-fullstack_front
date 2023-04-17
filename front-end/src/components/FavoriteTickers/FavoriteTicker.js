import { useState } from 'react';
import styled from 'styled-components';
import useDashboardFavorites from '../../hooks/api/useDashboardFavorites';
import { RxTriangleDown, RxTriangleUp } from 'react-icons/rx';
import { BsFillTrash3Fill } from 'react-icons/bs';
import useDeleteDashBoardFavorite from '../../hooks/api/useDeleteDashboardFavorite';
import { ModalComponent } from '../Modal';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export default function FavoriteTicker({ ticker, setTickers }) {
  const { deleteDashBoardFavorite } = useDeleteDashBoardFavorite();
  const { getDashboardFavorites } = useDashboardFavorites();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    updateDashboardFavorites();
  }, [update]);

  async function updateDashboardFavorites() {
    try {
      const result = await getDashboardFavorites();
      setTickers(result);
    } catch (error) {
      console.log(error);
      window.location.reload();
    }
  }

  async function deleteTicker() {
    setLoading(true);

    try {
      await deleteDashBoardFavorite(ticker.id);
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

  function variationCollor(percent) {
    if (percent > 0) {
      return '#008000';
    } else if (percent < 0) {
      return '#ff0000';
    } else {
      return '#a9a9a9';
    }
  }

  return (
    <>
      <ModalComponent
        title="Deseja remover dos favoritos?"
        close="Cancelar"
        confirm="Continuar"
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        propsFunction={deleteTicker}
        loading={loading}
      />
      <TickerContainer>
        <TickerImage src={ticker.logourl} />
        <Ticker>{ticker.symbol}</Ticker>
        <TickerPrice>
          <p>Valor atual</p>
          <p>R$ {ticker.regularMarketPrice.toFixed(2).replace('.', ',')}</p>
        </TickerPrice>
        <TickerVariation color={variationCollor(ticker.regularMarketChangePercent)}>
          <p>Variação diária</p>
          <div>
            {ticker.regularMarketChangePercent > 0 ? <RxTriangleUp /> : <RxTriangleDown />}
            <p>{ticker.regularMarketChangePercent.toFixed(2).replace('.', ',')}%</p>
          </div>
        </TickerVariation>
        <DeleteContainer onClick={() => setIsOpen(true)}>
          <BsFillTrash3Fill />
        </DeleteContainer>
      </TickerContainer>
    </>
  );
}

const TickerContainer = styled.div`
  display: flex;
  width: 90%;
  height: 4rem;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;

  @media (min-width: 1024px) {
    font-size: 1.1rem;
  }
`;

const TickerImage = styled.img`
  width: 3rem;
  border-radius: 0.5rem;

  @media (min-width: 1024px) {
    width: 3.5rem;
  }
`;

const Ticker = styled.div`
  width: 4rem;
  text-align: center;

  @media (min-width: 1024px) {
    width: 4.5rem;
  }
`;

const TickerPrice = styled.div`
  width: 5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  align-items: center;

  @media (min-width: 1024px) {
    width: 5.5rem;
  }
`;

const TickerVariation = styled.div`
  width: 6rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.color};
  }

  @media (min-width: 1024px) {
    width: 7.5rem;
  }
`;

const DeleteContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
`;
