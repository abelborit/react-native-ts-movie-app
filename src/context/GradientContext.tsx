import React, {createContext, useState} from 'react';

interface GradientProviderProps {
  children: JSX.Element | JSX.Element[];
}

interface GradientContextProps {
  currentColors: ImageColorsInterface;
  prevColors: ImageColorsInterface;
  setMainColors: (colors: ImageColorsInterface) => void;
  setPrevMainColors: (colors: ImageColorsInterface) => void;
}

interface ImageColorsInterface {
  primaryColor: string;
  secondaryColor: string;
}

export const GradientContext = createContext({} as GradientContextProps);

export const GradientProvider = ({children}: GradientProviderProps) => {
  const [currentColors, setCurrentColors] = useState<ImageColorsInterface>({
    primaryColor: 'transparent',
    secondaryColor: 'transparent',
  });

  const [prevColors, setPrevColors] = useState<ImageColorsInterface>({
    primaryColor: 'transparent',
    secondaryColor: 'transparent',
  });

  const setMainColors = (colorsObj: ImageColorsInterface) => {
    setCurrentColors(colorsObj);
  };

  const setPrevMainColors = (colorsObj: ImageColorsInterface) => {
    setPrevColors(colorsObj);
  };

  return (
    <GradientContext.Provider
      value={{currentColors, prevColors, setMainColors, setPrevMainColors}}>
      {children}
    </GradientContext.Provider>
  );
};
