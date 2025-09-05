'use client';
import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';
import { useEffect, useRef, ReactNode, createContext, useContext } from 'react';

interface LenisProviderProps {
  children: ReactNode;
}

type LenisContextType = {
  stopScroll: () => void;
  startScroll: () => void;
};

const LenisContext = createContext<LenisContextType | null>(null);

export function useLenisControl() {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error('useLenisControl must be used inside SmoothScrollProvider');
  }
  return context;
}

export default function SmoothScrollProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time);
      requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, []);

  const stopScroll = () => {
    lenisRef.current?.lenis?.stop();
    document.body.style.overflow = 'hidden';
  };

  const startScroll = () => {
    lenisRef.current?.lenis?.start();
    document.body.style.overflow = '';
  };

  return (
    <LenisContext.Provider value={{ stopScroll, startScroll }}>
      <ReactLenis root ref={lenisRef} options={{ autoRaf: false }}>
        {children}
      </ReactLenis>
    </LenisContext.Provider>
  );
}
