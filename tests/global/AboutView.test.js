import { render, screen } from '@testing-library/svelte'
import { expect, describe, it } from 'vitest'

import AboutView from '/src/global/pages/About.svelte'

describe('AboutView', () => {
    it('renders h1 properly', () => {
        render(AboutView)

        const h1 = screen.getByRole('heading')
        expect(h1.textContent).toBe('About')
    })
})
