import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import RegisterView from '../../views/RegisterView.vue'

describe('RegisterView', () => {
  it('renders form properly', () => {
    const wrapper = mount(RegisterView)
    expect(wrapper.find("form"))
    expect(wrapper.text()).toContain('Register')
  })
})
