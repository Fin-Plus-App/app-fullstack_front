import styled from 'styled-components';

export default function InputForm({
  label,
  id,
  name,
  value,
  onChange,
  type,
  placeholder,
  minLength,
  disabled,
  required,
  autoComplete,
}) {
  return (
    <InputContainer>
      <LabelStyle htmlFor={id}>{label}</LabelStyle>
      {autoComplete ? (
        <InputStyle
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          minLength={minLength}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
        />
      ) : (
        <InputStyle
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          minLength={minLength}
          disabled={disabled}
          required={required}
        />
      )}
    </InputContainer>
  );
}

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputStyle = styled.input`
  width: 90%;
  max-width: 30rem;
  height: 2.5rem;
  margin-bottom: 1rem;
  border: 1px solid #cecece;
  border-radius: 0.3rem;
  padding: 0.6rem;
  font-size: 1rem;
  font-weight: 300;
  color: #000000;
`;

const LabelStyle = styled.label`
  width: 90%;
  max-width: 30rem;
  margin-bottom: 0.3rem;
  font-size: 1.2rem;
  color: #ffffff;
`;
