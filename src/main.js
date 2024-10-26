import './assets/app.css'
import './assets/menu.css'
import './assets/pages.css'

import { mount } from 'svelte';
import App from './App.svelte'

const app = mount(
    App, {
        target: document.getElementById('app')
    }
)

export default app
