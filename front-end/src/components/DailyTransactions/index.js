import styled from 'styled-components';
import Transaction from './Transaction';
import dayjs from 'dayjs';

export default function DailyTransactions({ dailyTransactions, setUserRecords }) {
  const dateString = dailyTransactions.date;
  const date = dayjs(dateString).format('DD/MM/YYYY');

  return (
    <DailyContainer>
      <DailyTitle>
        <h3>{date}</h3>
      </DailyTitle>
      <TransactionContainer>
        <Labels>
          <h4>Ticker</h4>
          <h4>Quantidade</h4>
          <h4>Preço Unitário</h4>
          <h4>Total</h4>
          <h4>Operação</h4>
          <h5></h5>
        </Labels>

        {dailyTransactions.trades.map((transaction) => {
          return <Transaction transaction={transaction} key={transaction.id} setUserRecords={setUserRecords} />;
        })}
      </TransactionContainer>
    </DailyContainer>
  );
}

const DailyContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

const TransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #cecece;
  border-radius: 1rem;
  padding: 0 0.5rem;
`;

const Labels = styled.div`
  display: flex;
  width: 100%;
  height: 2rem;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  font-size: 0.8rem;

  h4 {
    width: 4rem;
    text-align: center;

    @media (min-width: 1024px) {
      width: 7rem;
    }
  }

  h5 {
    width: 1rem;
    text-align: center;

    @media (min-width: 1024px) {
      width: 2rem;
    }
  }

  @media (min-width: 1024px) {
    font-size: 1.2rem;
  }
`;

const DailyTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: 1.5rem 0;

  h3 {
    margin-right: 0.5rem;
    font-size: 1rem;
    font-weight: 500;

    @media (min-width: 1024px) {
    font-size: 1.3rem;
  }
  }
`;

const Border = styled.div`
  width: 95%;
  border-bottom: 1px solid #cecece;
`;
