import React from 'react';
import styled from '@emotion/styled';

export interface IIcon {
  name: string;
  color?: string;
  className?: string;
}

type Size = 0 | 16 | 24 | 26 | 32 | 40 | 48 | 96

interface IStyledIcon {
  size: Size;
  color: string;
}

const StyledIcon = styled.svg<IStyledIcon>`
  min-width: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  fill: var(--color-${({ color }) => color});
  transition: fill 0.2s;
`;

const Icon: React.VFC<IIcon> = (props): JSX.Element => {
  const { name, color = 'black', className = "" } = props;

  let size: Size = 0;
  if (name.includes('16')) size = 16;
  if (name.includes('24')) size = 24;
  if (name.includes('26')) size = 26;
  if (name.includes('32')) size = 32;
  if (name.includes('40')) size = 40;
  if (name.includes('48')) size = 48;
  if (name.includes('96')) size = 96;

  const xlinkHref = `#${name}`;

  return (
    <StyledIcon size={size} color={color} className={className}>
      <use xlinkHref={xlinkHref} />
    </StyledIcon>
  );
};

export default Icon;
