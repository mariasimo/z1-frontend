import styled from "styled-components";

export const Header = styled.header`
  border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.1);
  height: 3.75rem;
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  width: var(--width-container);
  max-width: var(--max-width-container);
  margin: 0 auto;

  ${Header} & {
    padding: var(--spacing-s) 0;
  }
  main & {
    padding: var(--spacing-m) 0;
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

export const Title = styled.h1`
  color: var(--color-text);
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: var(--spacing-s);
  text-align: center;
`;

export const Paragraph = styled.p`
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: var(--spacing-s);
  text-align: center;
`;
