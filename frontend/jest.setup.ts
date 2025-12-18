import '@testing-library/jest-dom';
import React from 'react';
import { jest } from '@jest/globals';

// Mock localStorage for testing environment
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => 'light'),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

// Mock matchMedia for testing environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    create: () => ({
      get: jest.fn(() => Promise.resolve({ data: [], headers: {} })),
      post: jest.fn(() => Promise.resolve({ data: {}, headers: {} })),
      put: jest.fn(() => Promise.resolve({ data: {}, headers: {} })),
      delete: jest.fn(() => Promise.resolve({ data: {}, headers: {} })),
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
    }),
  },
  create: () => ({
    get: jest.fn(() => Promise.resolve({ data: [], headers: {} })),
    post: jest.fn(() => Promise.resolve({ data: {}, headers: {} })),
    put: jest.fn(() => Promise.resolve({ data: {}, headers: {} })),
    delete: jest.fn(() => Promise.resolve({ data: {}, headers: {} })),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  }),
}));

jest.mock('@shared/api/config/config.ts', () => ({
  baseUrl: 'http://localhost:4000/api',
}));

Object.defineProperty(global, 'TextEncoder', {
  value: class {
    encode(input: string): Uint8Array {
      return new Uint8Array(Buffer.from(input));
    }
  },
});

Object.defineProperty(global, 'TextDecoder', {
  value: class {
    decode(input?: BufferSource): string {
      if (!input) return '';
      const buffer = input instanceof ArrayBuffer ? input : input.buffer;
      return Buffer.from(buffer).toString();
    }
  },
});

// Mock the Icon component
jest.mock('@shared/ui/Icon', () => {
  const MockIcon = ({
    name,
    ariaLabel,
    onClick,
    ...props
  }: {
    name: string;
    ariaLabel?: string;
    onClick?: () => void;
    [key: string]: unknown;
  }) =>
    React.createElement(
      'div',
      {
        'data-testid': `icon-${name}`,
        'aria-label': ariaLabel || `${name} icon`,
        onClick,
        ...props,
      },
      name
    );

  return {
    __esModule: true,
    default: MockIcon,
    Icon: MockIcon,
    iconNames: {
      ARROW_DOWN: 'arrowDown',
      ARROW_LEFT: 'arrowLeft',
      ARROW_UP: 'arrowUp',
      CANCEL: 'cancel',
      EDIT: 'edit',
      EYE: 'eye',
      EYE_SLASH: 'eyeSlash',
      INFO_CIRCLE: 'infoCircle',
      LOGOUT: 'logout',
      MENU: 'menu',
      MESSAGES: 'messages',
      OK: 'ok',
      PUBLISH: 'publish',
      TRASH: 'trash',
      UNPUBLISH: 'unpublish',
      USER1: 'user1',
      USER2: 'user2',
    },
    iconColors: {
      PRIMARY: 'primary',
      TERTIARY: 'tertiary',
      GRAY: 'gray',
      DANGER: 'danger',
      WHITE: 'white',
      SUCCESS: 'success',
    },
    iconSizes: {
      SMALL: 'small',
      MEDIUM: 'medium',
      LARGE: 'large',
    },
  };
});
