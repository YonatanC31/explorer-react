import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(cleanup);

Object.defineProperties(HTMLDialogElement.prototype, {
  showModal: {
    configurable: true,
    value(this: HTMLDialogElement): void {
      this.setAttribute('open', '');
      this.querySelector<HTMLButtonElement>('button')?.focus();
    },
  },
  close: {
    configurable: true,
    value(this: HTMLDialogElement): void { this.removeAttribute('open'); },
  },
});
