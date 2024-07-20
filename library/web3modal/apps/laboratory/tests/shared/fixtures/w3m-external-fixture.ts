import type { ModalFixture } from './w3m-fixture'
import { ModalPage } from '../pages/ModalPage'
import { ModalValidator } from '../validators/ModalValidator'
import { timingFixture } from './timing-fixture'

export const testMExternal = timingFixture.extend<ModalFixture>({
  library: ['wagmi', { option: true }],
  modalPage: async ({ page, library }, use) => {
    const modalPage = new ModalPage(page, library, 'external')
    await modalPage.load()
    await use(modalPage)
  },
  modalValidator: async ({ modalPage }, use) => {
    const modalValidator = new ModalValidator(modalPage.page)
    await use(modalValidator)
  }
})
