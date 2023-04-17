import styled from 'styled-components';
import { RxTriangleDown, RxTriangleUp } from 'react-icons/rx';

export default function Ticker({ ticker }) {
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
    <TickerContainer>
      <FixedInfos>
        <TickerImage src={ticker.tickerData.logourl} />
        <TickerSymbol>{ticker.tickerData.symbol}</TickerSymbol>
      </FixedInfos>
      <Infos>
        <TickerInfo>
          <p>Preço médio</p>
          <p>R$ {(ticker.averagePrice / 100).toFixed(2).replace('.', ',')}</p>
        </TickerInfo>
        <TickerInfo>
          <p>Preço atual</p>
          <p>R$ {ticker.tickerData.regularMarketPrice.toFixed(2).replace('.', ',')}</p>
        </TickerInfo>
        <TickerVariationPercent
          color={variationCollor(
            ((ticker.tickerData.regularMarketPrice - ticker.averagePrice / 100) / (ticker.averagePrice / 100)) * 100
          )}
        >
          <p>Variação (%)</p>
          <div>
            {((ticker.tickerData.regularMarketPrice - ticker.averagePrice / 100) / (ticker.averagePrice / 100)) * 100 >
            0 ? (
                <RxTriangleUp />
              ) : (
                <RxTriangleDown />
              )}
            <p>
              {(
                ((ticker.tickerData.regularMarketPrice - ticker.averagePrice / 100) / (ticker.averagePrice / 100)) *
                100
              )
                .toFixed(2)
                .replace('.', ',')}
              %
            </p>
          </div>
        </TickerVariationPercent>
        <TickerInfo>
          <p>Quantidade</p>
          <p>{ticker.amount.toFixed(2).replace('.', ',')}</p>
        </TickerInfo>
        <TickerInfo>
          <p>Total</p>
          <p>R$ {(ticker.amount * ticker.tickerData.regularMarketPrice).toFixed(2).replace('.', ',')}</p>
        </TickerInfo>
        <VariationPrice
          color={variationCollor(
            ((ticker.tickerData.regularMarketPrice - ticker.averagePrice / 100) / (ticker.averagePrice / 100)) * 100
          )}
        >
          <p>Variação (R$)</p>
          <div>
            <p>
              R${' '}
              {((ticker.tickerData.regularMarketPrice - ticker.averagePrice / 100) * ticker.amount)
                .toFixed(2)
                .replace('.', ',')}
            </p>
          </div>
        </VariationPrice>
      </Infos>
    </TickerContainer>
  );
}

const TickerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  justify-content: space-between;
  align-items: center;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 1024px) {
    font-size: 1.1rem;
  }
`;

const FixedInfos = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  background: #252525;
`;

const Infos = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 9rem;

  @media (min-width: 1024px) {
    justify-content: space-around;
  }
`;

const TickerImage = styled.img`
  width: 3rem;
  border-radius: 0.5rem;
  margin: 0 0 0 1rem;

  @media (min-width: 1024px) {
    width: 3.5rem;
  }
`;

const TickerSymbol = styled.div`
  min-width: 4rem;
  text-align: center;
  margin: 0 0.5rem;
`;

const TickerInfo = styled.div`
  min-width: 6rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  margin: 0 0.5rem;
`;

const TickerVariationPercent = styled.div`
  min-width: 6rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  margin: 0 0.5rem;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.color};
  }
`;

const VariationPrice = styled.div`
  min-width: 6.2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  margin: 0 0.5rem;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${(props) => props.color};
  }
`;
