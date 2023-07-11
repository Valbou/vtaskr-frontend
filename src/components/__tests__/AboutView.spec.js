import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AboutView from '../../views/AboutView.vue'

describe('AboutView', () => {
  it('renders h1 properly', () => {
    const wrapper = mount(AboutView)
    expect(wrapper.text()).toContain('Legal Notice')
  }),

  it('renders h2 properly', () => {
    const wrapper = mount(AboutView)
    expect(wrapper.text()).toContain('Bug Bounty')
  })
})
