import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FavoriteTickers from '../../components/FavoriteTickers';
import Header from '../../components/Header';
import UserContext from '../../contexts/UserContext';
import styled from 'styled-components';
import PortfolioChart from '../../components/PortifolioChart';
import useUserPortfolio from '../../hooks/api/useUserPortfolio';
import useTickersData from '../../hooks/brapiApi/useTickersData';
import LoadingPage from '../../components/LoadingPage';

export default function Dashboard() {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
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
    if (!userData.token) {
      navigate('/');
    }
  }, []);

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
      const labels = userPortfolio.map((portifolioItem) => {
        return portifolioItem.ticker;
      });

      const datasets = {
        label: 'Valor',
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
        borderColor: '#cecece',
        hoverBorderColor: '#252525',
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
          const color = getRandomColor();
          datasets.backgroundColor.push(color);
          datasets.hoverBackgroundColor.push(color);
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

  if (!chartData) {
    return <LoadingPage />;
  }

  return (
    <DashboardContainer>
      <Header />
      <PageTitle>Dashboard</PageTitle>
      {chartData.labels.length === 0 ? (
        <PortfolioContainer>
          <EmptyPortfolio>
            <h4>Sua carteira está vazia, adicione novos ativos!</h4>
          </EmptyPortfolio>
        </PortfolioContainer>
      ) : (
        <PortfolioContainer>
          <PortfolioChart chartData={chartData} total={total} />
          <PortfolioLink>
            <Link to="/carteira">Ir para a carteira</Link>
          </PortfolioLink>
        </PortfolioContainer>
      )}

      <FavoriteTickers />
    </DashboardContainer>
  );
}

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  color: #ffffff;
  margin-top: 4rem;

  @media (min-width: 1024px) {
    margin-top: 6rem;
  }
`;

const PortfolioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: 1.5rem;
  text-align: center;
  cursor: pointer;

  @media (min-width: 1024px) {
    font-size: 2.2rem;
  }
`;

const PortfolioLink = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #2b97e5;
  text-decoration: underline;
  margin-bottom: 0.5rem;
  cursor: pointer;

  a:visited {
    color: #2b97e5;
  }

  @media (min-width: 1024px) {
    font-size: 1.2rem;
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
