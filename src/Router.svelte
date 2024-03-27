<script>
    import { Router, Link, Route } from 'svelte-routing';
    import { isUserAuthenticated } from '@/lib/iam/authentication.js'

    import VTaskr from '@/global/components/vTaskrLogo.svelte'
    import Home from '@/global/pages/Home.svelte'
    import About from '@/global/pages/About.svelte'

    import Register from '@/users/pages/Register.svelte'
    import Login from '@/users/pages/Login.svelte'
    import MFA from '@/users/pages/MFA.svelte'
    import Logout from '@/users/pages/Logout.svelte'

    export let url = '';
</script>

<Router {url}>
    <header>
        <nav>
            <Link class='navlink' to='/'><VTaskr /></Link>
        </nav>
    </header>
    <section>
        <Route path='/register'><Register /></Route>
        <Route path='/'><Login /></Route>
        <Route path='/about'><About /></Route>
        {#if isUserAuthenticated()}
        <Route path='/mfa'><MFA /></Route>
        <Route path='/logout'><Logout /></Route>
        {/if}
        <Route path="*">Not Found</Route>
    </section>
    <footer>
        <nav>
            <Link to="/">Login</Link>
            <Link to="/about">About</Link>
            <Link to="/register">Register</Link>
        </nav>
    </footer>
</Router>
