import { InjectionToken, FactoryProvider } from '@angular/core';

/**
 * WINDOW to extract url
 */
export const WINDOW = new InjectionToken<Window>('window');

/**
 * Provider of window
 */
const windowProvider: FactoryProvider = {
  provide: WINDOW,
  useFactory: () => window
};

/**
 * WINDOWS providers, at this time only one window provider
 */
export const WINDOW_PROVIDERS = [
  windowProvider
];
