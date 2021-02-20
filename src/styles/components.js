import styled from "styled-components";
import { Link } from "wouter";
import { ReactComponent as IdBackgroundSvg } from "../assets/id.svg";

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
    padding: var(--spacing-l) 0;
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
  margin-bottom: var(--spacing-m);
  text-align: center;
`;

export const CardContainer = styled.article`
  align-items: center;
  background-color: var(--color-background);
  border-radius: var(--border-radius-card-frame);
  box-shadow: 0 0.75em 1.2em -0.3em rgba(var(--color-secondary-rgb), 0.15);
  display: flex;
  height: var(--height-card-frame);
  justify-content: center;
  margin: 0 auto;
  position: relative;
  width: var(--width-card-frame);
  z-index: 1;
`;

export const IdBackground = styled(IdBackgroundSvg)`
  position: absolute;
  z-index: -1;
`;

export const CardImage = styled.img`
  border-radius: var(--border-radius-card-frame);
  border: 2px solid ${(p) => p.color};
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  z-index: -1;
`;

export const LinkAsButton = styled(Link)`
  background-color: var(--color-primary);
  border-bottom: 1px solid rgba(var(--color-primary-rgb), 0.3);
  border-radius: 1.5em;
  color: var(--color-text-inverse);
  font-weight: 700;
  min-width: 10rem;
  padding: 0.77rem 1.2rem 0.73rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
`;

export const OutcomeTag = styled.div`
  align-items: center;
  background-color: ${(p) => p.color};
  border-radius: var(--spacing-xxs);
  bottom: 0;
  color: var(--color-text-inverse);
  display: flex;
  font-size: 0.75em;
  font-weight: 700;
  padding-right: var(--spacing-xs);
  position: absolute;
  right: var(--spacing-l);
  text-transform: uppercase;
  transform: translateY(50%);
`;
