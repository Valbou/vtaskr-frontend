import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import LoginView from '../../views/LoginView.vue'

describe('LoginView', () => {
  it('renders form properly', () => {
    const wrapper = mount(LoginView)
    expect(wrapper.find("form"))
    expect(wrapper.find(".login"))
    expect(wrapper.find("#user"))
    expect(wrapper.find("#pass"))
  })
})
