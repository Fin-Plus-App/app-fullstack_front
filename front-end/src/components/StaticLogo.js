import styled from 'styled-components';

export default function StaticLogo() {
  return (
    <div>
      <LogoName>
        <p>fin+</p>
      </LogoName>
    </div>
  );
}

const LogoName = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-family: 'Alkatra', cursive;
  font-weight: 400;
  font-size: 5rem;
  color: #ffffff;
  margin-bottom: 2rem;

  @media (min-width: 1024px) {
    font-size: 7rem;
  }
`;
