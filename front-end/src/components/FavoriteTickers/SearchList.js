import styled from 'styled-components';
import { RxTriangleDown, RxTriangleUp } from 'react-icons/rx';

export default function SearchList({ tickersList, setSearchOpen, setSelectedTicker, setSearchValue }) {
  function selectTicker(ticker) {
    setSelectedTicker(ticker);
    setSearchValue(ticker);
    setSearchOpen(false);
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
    <SearchListContainer>
      {tickersList.length === 0 ? (
        <ResultSearch>Nenhum resultado encontrado!</ResultSearch>
      ) : (
        <>
          {tickersList.map((ticker, index) => {
            return (
              <ResultSearch key={index} onClick={() => selectTicker(ticker.symbol)}>
                <TickerImage src={ticker.logourl} />
                <Ticker>{ticker.symbol}</Ticker>
                <TickerPrice>
                  <p>R$ {ticker.regularMarketPrice.toFixed(2).replace('.', ',')}</p>
                </TickerPrice>
                <TickerVariation color={variationCollor(ticker.regularMarketChangePercent)}>
                  <div>
                    {ticker.regularMarketChangePercent > 0 ? <RxTriangleUp /> : <RxTriangleDown />}
                    <p>{ticker.regularMarketChangePercent.toFixed(2).replace('.', ',')}%</p>
                  </div>
                </TickerVariation>
              </ResultSearch>
            );
          })}
        </>
      )}
    </SearchListContainer>
  );
}

const SearchListContainer = styled.div`
  width: 100%;
  max-height: 9rem;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  overflow-y: auto;
`;

const ResultSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  margin: 0.5rem 0;
  cursor: pointer;
`;

const TickerImage = styled.img`
  width: 3rem;
  border-radius: 0.5rem;

  @media (min-width: 1024px) {
    margin: 0 2rem 0 0;
  }
`;

const Ticker = styled.div`
  width: 5.5rem;
  text-align: center;
`;

const TickerPrice = styled(Ticker)`
  width: 7rem;
`;

const TickerVariation = styled.div`
  width: 5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${(props) => props.color};
  }
`;
