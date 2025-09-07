import { BREAKPOINT_INFO } from './constants.js';

export function getBreakpointInfo(value: string) {
  if (value.includes('mobile')) {
    return BREAKPOINT_INFO.mobile;
  }
  if (value.includes('tablet')) {
    return BREAKPOINT_INFO.tablet;
  }
  if (value.includes('laptop')) {
    return BREAKPOINT_INFO.laptop;
  }
  if (value.includes('desktop-max')) {
    return BREAKPOINT_INFO.desktopMax;
  }
  if (value.includes('desktop')) {
    return BREAKPOINT_INFO.desktop;
  }
  return null;
}
