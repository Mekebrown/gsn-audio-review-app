import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';

import { handlers } from '@/__tests__/__mock handlers__/handlers';
 
export const server = setupServer(...handlers);

server.events.on('request:start', ({ request }) => {
    console.log('MSW intercepted:', request.method, request.url);
});

beforeAll(() => {
  // Start the interception.
  server.listen()
});
 
afterEach(() => {
  // Remove any handlers you may have added
  // in individual tests (runtime handlers).
  server.resetHandlers()
});
 
afterAll(() => {
  // Disable request interception and clean up.
  server.close()
});
