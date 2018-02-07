import { mount } from 'vue-test-utils'
import sinon from 'sinon'
import Footer from '@/components/Footer'

describe('Footer', () => {
  it('uses the current year always', () => {
    const year = 1984

    // Sandboxing the global Date object avoids problems with other tests
    const sandbox = sinon.createSandbox({
      useFakeTimers: new Date(year, 1)
    })

    mount(Footer).vm.year.should.eql(year.toString())

    sandbox.restore()
  })
})
