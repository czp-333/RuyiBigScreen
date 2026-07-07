import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

const worker = setupWorker(...handlers)

export async function initMock() {
  await worker.start({
    serviceWorker: { url: '/mockServiceWorker.js' },
    quiet: false,
  })
}
