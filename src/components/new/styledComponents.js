import styled from "styled-components"

export const Button = styled.button`
  background-color: #3751ff;
  color: #ffffff;
  border: none;
  border-radius: 200px;
  padding: 17px 40px 13px;
  font-size: 16px;
  margin-right: 22px;
  cursor: pointer;
  transition: background-color 50ms ease-in;
  margin-top: 50px;

  &:hover,
  :active,
  :focus {
    background-color: #0322f0;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`
