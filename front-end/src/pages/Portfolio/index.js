import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import useUserPortfolio from '../../hooks/api/useUserPortfolio';
import useTickersData from '../../hooks/brapiApi/useTickersData';
import PortfolioTickers from '../../components/PortfolioTickers';
import PortfolioChart from '../../components/PortifolioChart';
import styled from 'styled-components';
import LoadingPage from '../../components/LoadingPage';

export default function Portifolio() {
  const [tickersData, setTickersData] = useState();
  const { userPortfolio } = useUserPortfolio();
  const { getTickersData } = useTickersData();
  const [total, setTotal] = useState();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Valor',
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
    hoverOffset: 4,
  });

  useEffect(() => {
    if (userPortfolio) {
      const tickersList = [];
      userPortfolio.forEach((item) => {
        return tickersList.push(item.ticker);
      });

      const params = tickersList.join('%2C');

      getPortifolioTickersData(params);
    }
  }, [userPortfolio]);

  async function getPortifolioTickersData(params) {
    try {
      const result = await getTickersData(params);
      setTickersData(result);

      const labels = userPortfolio.map((portifolioItem) => {
        return portifolioItem.ticker;
      });

      const datasets = {
        label: 'Valor',
        data: [],
        backgroundColor: [],
      };

      let totalPortifolio = 0;

      userPortfolio.forEach((portifolioItem) => {
        const tickerData = result.find((data) => {
          return data.symbol === portifolioItem.ticker;
        });

        if (tickerData) {
          const amount = portifolioItem.amount;
          const regularMarketPrice = tickerData.regularMarketPrice;
          const totalTicker = Number((amount * regularMarketPrice).toFixed(2));

          totalPortifolio += totalTicker;
          datasets.data.push(totalTicker);
          datasets.backgroundColor.push(getRandomColor());
        }
      });

      setTotal(totalPortifolio.toFixed(2).replace('.', ','));
      setChartData({
        labels: labels,
        datasets: [datasets],
        hoverOffset: 4,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  if (!chartData || !userPortfolio || !tickersData) {
    return (
      <PortfolioContainer>
        <Header />
        <PageTitle>Minha Carteira</PageTitle>
        <EmptyPortfolio>
          <h4>Sua carteira está vazia, adicione novos ativos!</h4>
        </EmptyPortfolio>
      </PortfolioContainer>
    );
  }

  return (
    <PortfolioContainer>
      <Header />
      <PageTitle>Minha Carteira</PageTitle>
      <PortfolioInfos>
        <PortfolioChart chartData={chartData} total={total} />
        <PortfolioTickers userPortfolio={userPortfolio} tickersData={tickersData} />
      </PortfolioInfos>
    </PortfolioContainer>
  );
}

const PortfolioContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  color: #ffffff;
  margin-top: 4rem;

  @media (min-width: 1024px) {
    margin-top: 6rem;
  }
`;

const PortfolioInfos = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: 1.5rem;
  text-align: center;

  @media (min-width: 1024px) {
    font-size: 2.2rem;
  }
`;

const EmptyPortfolio = styled.div`
  width: calc(100% - 2rem);
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5rem 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  border: 1px solid #cecece;
  border-radius: 0.5rem;

  h4 {
    width: 90%;
  }
  @media (min-width: 1024px) {
    font-size: 1.4rem;
  }
`;
