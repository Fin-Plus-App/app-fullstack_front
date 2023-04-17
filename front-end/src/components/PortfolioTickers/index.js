import styled from 'styled-components';
import Ticker from './Ticker';
import { useState } from 'react';
import { useEffect } from 'react';

export default function PortfolioTickers({ userPortfolio, tickersData }) {
  const [portfolioTickers, setPortfolioTickers] = useState();

  useEffect(() => {
    if (userPortfolio && tickersData) {
      const combinedArray = userPortfolio.map((portfolioItem) => {
        const tickerData = tickersData.find((tickerItem) => tickerItem.symbol === portfolioItem.ticker);
        return {
          ticker: portfolioItem.ticker,
          amount: portfolioItem.amount,
          averagePrice: portfolioItem.averagePrice,
          tickerData: tickerData || null,
        };
      });

      setPortfolioTickers(combinedArray);
    }
  }, [userPortfolio, tickersData]);

  if (!portfolioTickers || portfolioTickers.length === 0) {
    return <></>;
  }

  return (
    <PortfolioTickersContainer>
      {portfolioTickers.map((ticker, index) => {
        return <Ticker ticker={ticker} key={index} />;
      })}
    </PortfolioTickersContainer>
  );
}

const PortfolioTickersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #cecece;
  border-radius: 0.5rem;
  margin: 1rem;
  padding: 1rem 0;
  position: relative;
`;
