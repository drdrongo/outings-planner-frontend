import { createContext, useContext, } from 'react';

type GlobalResponsive = {
  isMobile: boolean;
  isDesktop: boolean;
};

export const ResponsiveContext = createContext<GlobalResponsive>({
  isMobile: true,
  isDesktop: false,
});

export const useResponsiveContext = () => useContext(ResponsiveContext);
