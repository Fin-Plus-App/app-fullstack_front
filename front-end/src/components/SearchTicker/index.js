import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import useSearchTickers from '../../hooks/brapiApi/useSearchTickers';
import useTickersData from '../../hooks/brapiApi/useTickersData';
import SearchList from '../FavoriteTickers/SearchList';

export default function SearchTicker({ selectedTicker, setSelectedTicker }) {
  const [searchValue, setSearchValue] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [tickersList, setTickersList] = useState();
  const { getSearchTickers } = useSearchTickers();
  const { getTickersData } = useTickersData();

  function handleForm(event) {
    const { value } = event.target;

    if (searchValue !== undefined) {
      setSelectedTicker();
    }
    setSearchValue(value);
  }

  useEffect(() => {
    if (searchValue.length >= 3 && selectedTicker === undefined) {
      searchTickers();
    } else {
      setTickersList();
    }
  }, [searchValue]);

  async function searchTickers() {
    try {
      const result = await getSearchTickers(searchValue);
      if (result.length > 0) {
        const tickersData = await getTickersData(result);

        setTickersList(tickersData);
      } else {
        setTickersList(result);
      }
      setSearchOpen(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AddFavoriteTickerContainer>
      <SearchContainer>
        <DebounceInput
          name="ticker"
          id="ticker"
          element={SearchInput}
          value={searchValue}
          debounceTimeout={300}
          onChange={handleForm}
          type="text"
          placeholder="Pesquise por um ticker"
          autoComplete="off"
          required="required"
          onClick={() => setSearchOpen(true)}
        ></DebounceInput>
        <ResultContainer>
          {tickersList && searchOpen && (
            <SearchList
              tickersList={tickersList}
              setSearchOpen={setSearchOpen}
              setSelectedTicker={setSelectedTicker}
              setSearchValue={setSearchValue}
            />
          )}
        </ResultContainer>
      </SearchContainer>
    </AddFavoriteTickerContainer>
  );
}

const AddFavoriteTickerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  width: 90%;
  max-width: 30rem;
  height: 2.5rem;
  border: 1px solid #cecece;
  border-radius: 0.3rem;
  padding: 0.6rem;
  font-size: 1rem;
  font-weight: 300;
  color: #000000;
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ResultContainer = styled.div`
  width: 90%;
  max-width: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 2.5rem;
  background: #ffffff;
  color: #000;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;
