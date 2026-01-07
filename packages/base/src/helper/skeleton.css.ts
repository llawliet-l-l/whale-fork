import { keyframes, style } from '@vanilla-extract/css';

export const waveSquares = keyframes({
  '0%': {
    backgroundPosition: '-468px 0',
  },
  '100%': {
    backgroundPosition: '468px 0',
  },
});

export const skeletonBaseStyle = style({
  background:
    'linear-gradient(90deg, var(--w-color-neutral-bg-static-primary-emphasis) 0%, var(--w-color-neutral-bg-static-primary-mute) 100%)',
  animation: `${waveSquares} 2s infinite`,
  backgroundSize: '800px 100px',
});
