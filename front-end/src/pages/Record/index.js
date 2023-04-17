import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import useAllUserTransactions from '../../hooks/api/useAllUserTransactions';
import styled from 'styled-components';
import Header from '../../components/Header';
import DailyTransactions from '../../components/DailyTransactions';

export default function Record() {
  const [userRecords, setUserRecords] = useState();
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();
  const [userTransactions, setUserTransactions] = useState();
  const { allUserTransactions } = useAllUserTransactions();

  useEffect(() => {
    if (allUserTransactions) {
      setUserRecords(allUserTransactions);
    }
  }, [allUserTransactions]);

  useEffect(() => {
    if (!userData.token) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (userRecords) {
      const groupedTransactions = userRecords.reduce((acc, curr) => {
        const date = curr.date;

        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(curr);
        return acc;
      }, {});

      const transformedArray = Object.entries(groupedTransactions).map(([key, value]) => ({
        date: key,
        trades: value,
      }));

      setUserTransactions(transformedArray);
    }
  }, [userRecords]);

  if (!userTransactions || !userRecords) {
    return (
      <RecordContainer>
        <Header />
        <RecordInfos>
          <RecordSubTitle>
            <h2>Histórico de compra e venda:</h2>
          </RecordSubTitle>
          <RecordMessage>
            <h4>Você não possui nenhum registro!</h4>
          </RecordMessage>
        </RecordInfos>
      </RecordContainer>
    );
  }

  return (
    <RecordContainer>
      <Header />
      <RecordInfos>
        <RecordSubTitle>
          <h2>Histórico de compra e venda:</h2>
        </RecordSubTitle>
        {userTransactions.map((dailyTransactions) => {
          return (
            <DailyTransactions
              key={dailyTransactions.date}
              dailyTransactions={dailyTransactions}
              setUserRecords={setUserRecords}
            />
          );
        })}
      </RecordInfos>
    </RecordContainer>
  );
}

const RecordContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  color: #ffffff;
  margin-top: 4rem;

  @media (min-width: 1024px) {
    margin-top: 6rem;
  }
`;

const RecordInfos = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  margin-bottom: 2rem;
`;

const RecordSubTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2rem 0 1rem 0;

  h2 {
    font-size: 1.5rem;
    font-weight: 400;
    text-align: center;
    cursor: pointer;

    @media (min-width: 1024px) {
      font-size: 2.2rem;
    }
  }
`;

const RecordMessage = styled.div`
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
