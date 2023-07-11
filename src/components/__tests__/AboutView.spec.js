import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AboutView from '../../views/AboutView.vue'

describe('AboutView', () => {
  it('renders h1 properly', () => {
    const wrapper = mount(AboutView)
    expect(wrapper.find("h1"))
    expect(wrapper.text()).toContain('About')
  })
})
