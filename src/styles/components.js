import styled from "styled-components";

export const Header = styled.header`
  border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.1);
  height: 3.75rem;
  display: flex;
  align-items: center;
`;

export const MainContainer = styled.main`
  width: var(--width-container);
  max-width: var(--max-width-container);
  margin: 0 auto;

  ${Header} & {
    padding: var(--spacing-s) 0;
  }
`;

export const Logo = styled.p`
  color: var(--color-primary);
  font-style: italic;
  font-weight: 700;
  font-size: 1.3rem;

  a {
    text-decoration: none;
  }
`;
