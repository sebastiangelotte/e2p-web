import styled from "styled-components"

export const Button = styled.button.attrs(props => ({
  color: props.color || "#fff",
  backgroundColor: props.backgroundColor || "#3751ff",
  borderColor: props.borderColor || "transparent",
}))`
  ${props => `
    --color: ${props.color};
    --background-color: ${props.backgroundColor};
    --border-color: ${props.borderColor};
  `}

  background-color: var(--background-color);
  color: var(--color);
  border: none;
  border-radius: 200px;
  padding: 14px 40px;
  font-size: 16px;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 50ms ease-in;
  border: 2px solid var(--border-color);

  &:hover,
  &:active,
  &:focus {
  }

  > svg {
    font-size: 1.5em;
    vertical-align: bottom;
    margin-right: 8px;
    margin-left: -15px;
  }

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`

export const Section = styled.section`
  padding-top: 60px;
  padding-bottom: 60px;
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 400px) {
    padding-left: 15px;
    padding-right: 15px;
  }

  ${props =>
    props.gradient &&
    `
    background: linear-gradient(180deg, #FFFFFF 0%, #F2F9FF 100%);
  `}
  ${props =>
    props.background &&
    `
    background-color: #F2F9FF;
  `}
  ${props =>
    props.firstSection &&
    `
    padding-top: 150px;
  `}
`

export const SectionWithBackgroundImage = styled(Section)`
  background-image: url(${props => props.backgroundImage});
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
  color: #fff;
`

export const Tag = styled.span`
  color: #ff2e6a;
  background-color: #f9f3fe;
  padding: 15px 35px 18px 35px;
  border-radius: 7px;
  font-size: 18px;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
`

export const Heading = styled.h2`
  color: #1e266d;
  font-weight: 600;
  font-size: 48px;

  @media screen and (max-width: 800px) {
    font-size: 26px;
  }

  ${props =>
    props.serif &&
    `
    font-family: "Crimson Text", Georgia, "Times New Roman", Times, serif;
  `}
  ${props =>
    props.inverted &&
    `
    color: #fff;
  `}
`

export const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
`
