import styled from 'styled-components';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ButtonForm from '../../components/Form/Button';
import InputForm from '../../components/Form/Input';
import dayjs from 'dayjs';
import { ResumeModalComponent } from '../../components/ResumeModal';
import SearchTicker from '../../components/SearchTicker';
import useSaveUserTransaction from '../../hooks/api/useSaveUserTransaction';

export default function SellRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ price: '', amount: '', date: '' });
  const [sellInfos, setSellInfos] = useState({});
  const [text, setText] = useState({ ticker: '', price: '', amount: '', totalPrice: '', date: '', status: 'Compra' });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState();
  const { saveUserTransaction } = useSaveUserTransaction();

  function handleForm(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  function convertValue(event) {
    let newValue = event.target.value;
    newValue = newValue.replace(/\D/g, '');
    newValue = newValue.replace(/(\d)(\d{2})$/, '$1,$2');
    newValue = newValue.replace(/(?=(\d{3})+(\D))\B/g, '.');
    event.target.value = newValue;
    return event;
  }

  async function submit(event) {
    event.preventDefault();
    const regexData = /^\d{4}-\d{2}-\d{2}$/;

    if (regexData.test(form.date)) {
      const price = parseInt(form.price.replace(/[^\d]+/g, ''));
      const amount = Number(form.amount);
      const totalPrice = price * amount;

      const date = new Date(form.date).toISOString();
      const body = {
        ticker: selectedTicker,
        totalPrice: totalPrice,
        amount: amount,
        date: date,
        status: 'BUY',
      };

      setSellInfos(body);

      const formattedTotalPrice = (totalPrice / 100).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      const newDate = dayjs(form.date);
      const formattedDate = newDate.format('DD/MM/YYYY');

      setText({
        ...text,
        ticker: selectedTicker,
        price: form.price,
        amount: amount.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
        totalPrice: formattedTotalPrice,
        date: formattedDate,
      });
      setIsOpen(true);
    } else {
      toast.error('A data não está no formato correto!');
    }
  }

  async function register() {
    setLoading(true);

    try {
      await saveUserTransaction(sellInfos);
      toast.success('Informações salvas com sucesso!');
      setLoading(false);
      navigate('/registros');
    } catch (error) {
      setLoading(false);
      toast.error('Não foi possível salvar suas informações!');
    }
  }

  return (
    <SellRegisterContainer>
      <ResumeModalComponent
        title="Resumo:"
        text={text}
        close="Cancelar"
        confirm="Continuar"
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        propsFunction={register}
        loading={loading}
      />
      <Header />
      <PageTitle>Registrar Compra</PageTitle>
      <FormContainer onSubmit={submit}>
        <Label>Ticker</Label>
        <SearchTicker selectedTicker={selectedTicker} setSelectedTicker={setSelectedTicker} />
        <InputForm
          label="Preço Unitário (R$)"
          id="price"
          name="price"
          value={form.price}
          onChange={(e) => handleForm(convertValue(e))}
          type="text"
          placeholder="R$ 0,00"
          disabled=""
          autoComplete="off"
          required
        ></InputForm>
        <InputForm
          label="Quantidade"
          id="amount"
          name="amount"
          value={form.amount}
          onChange={handleForm}
          type="number"
          placeholder="Insira a quantidade"
          disabled=""
          autoComplete="off"
          required
        ></InputForm>
        <InputForm
          label="Data"
          id="date"
          name="date"
          value={form.date}
          onChange={handleForm}
          type="date"
          placeholder="DD/MM/AAAA"
          disabled=""
          autoComplete="off"
          required
        ></InputForm>
        <ButtonForm type="submit" disabled="">
          Salvar
        </ButtonForm>
      </FormContainer>
    </SellRegisterContainer>
  );
}

const SellRegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  color: #ffffff;
  margin-top: 4rem;

  @media (min-width: 1024px) {
    margin-top: 6rem;
  }
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

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const Label = styled.label`
  width: 90%;
  max-width: 30rem;
  margin-bottom: 0.3rem;
  font-size: 1.2rem;
  color: #ffffff;
`;
