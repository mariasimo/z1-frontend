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

export const Title = styled.h1<{ color?: string }>`
  color: ${(p) => (p.color ? p.color : "var(--color-text)")};
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: var(--spacing-s);
  text-align: center;
`;

export const Paragraph = styled.p<{ color?: string }>`
  color: ${(p) => (p.color ? p.color : "var(--color-text)")};
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
  justify-content: center;
  margin: 0 auto;
  position: relative;
  height: var(--height-card-frame);
  width: var(--width-card-frame);
  z-index: 1;
`;

export const IdBackground = styled(IdBackgroundSvg)`
  position: absolute;
  z-index: -1;
`;

export const CardImage = styled.img<{ color?: string }>`
  border-radius: var(--border-radius-card-frame);
  border: 2px solid ${(p) => p.color};
  position: absolute;
  z-index: -1;
  height: var(--height-card-frame);
  width: var(--width-card-frame);
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

export const Button = styled.button<{ ghost: boolean }>`
  background-color: ${(p) =>
    !p.ghost ? "var(--color-primary)" : "transparent"};
  border-radius: 1.5em;
  color: var(--color-text-inverse);
  font-weight: 700;
  min-width: 10rem;
  padding: 0.77rem 1.2rem 0.73rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  border: none;
`;

export const OutcomeTag = styled.div<{ color?: string }>`
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

export const CameraContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const Blur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: 0 0;
  backdrop-filter: blur(0.25em) saturate(50%) brightness(50%);
  clip-path: polygon(
    0% 0%,
    0% 100%,
    calc(50% - calc(var(--width-card-frame) / 2)) 100%,
    calc(50% - calc(var(--width-card-frame) / 2))
      calc(50% - calc(var(--height-card-frame) / 2)),
    calc(50% + calc(var(--width-card-frame) / 2))
      calc(50% - calc(var(--height-card-frame) / 2)),
    calc(50% + calc(var(--width-card-frame) / 2))
      calc(50% + calc(var(--height-card-frame) / 2)),
    calc(50% - calc(var(--width-card-frame) / 2))
      calc(50% + calc(var(--height-card-frame) / 2)),
    calc(50% - calc(var(--width-card-frame) / 2)) 100%,
    100% 100%,
    100% 0%
  );
`;

export const Video = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: 0 0;
  z-index: -1;
  backdrop-filter: blur(10px);
`;

export const Canvas = styled.canvas<{ color?: string }>`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: var(--height-card-frame);
  width: var(--width-card-frame);
  outline: ${(p) => (p.color ? `2px solid ${p.color}` : "none")};
`;

export const CanvasContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: var(--height-card-frame);
  width: var(--width-card-frame);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Alert = styled.p<{ color?: string }>`
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: -2.5rem;
  color: var(--color-text-inverse);
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border: 2px solid ${(p) => p.color};
    border-radius: 50%;
    width: 1rem;
    margin-right: var(--spacing-xs);
  }
`;

export const CountDown = styled.p`
  position: absolute;
  text-align: center;
  font-size: 3.2rem;
  font-weight: 700;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: var(--height-card-frame);
  width: var(--width-card-frame);
  color: var(--color-text-inverse);
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 0 0.05em 0.15em rgba(var(--color-secondary-rgb), 0.45);
`;

export const ContentsLayout = styled.section`
  z-index: 1;
  position: absolute;
  top: 10rem;
  left: 0;
  right: 0;
  bottom: 10rem;
  width: 100vw;

  width: var(--width-container);
  max-width: var(--max-width-container);
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

export const Loading = styled.img`
  z-index: 1;
  position: absolute;
`;
