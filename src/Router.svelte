<script>
    import { Router, Link, Route } from 'svelte-routing'
    import { isUserAuthenticated } from './domain/auth/authentication.jsn.js'

    import BaseLayout from './layouts/BaseLayout.svelte'

    import About from './pages/publics/About.svelte'
    import Presentation from './pages/publics/Presentation.svelte'
    import Features from './pages/publics/Features.svelte'

    import Register from './pages/publics/users/Register.svelte'
    import Login from './pages/publics/users/Login.svelte'
    import MFA from './pages/privates/users/MFA.svelte'
    import Logout from './pages/privates/users/Logout.svelte'
    import Groups from './pages/privates/users/Groups.svelte'
    import Group from './pages/privates/users/Group.svelte'
    import JoinGroup from './pages/privates/users/JoinGroup.svelte'

    import MenuSecondary from './components/tasks/MenuSecondary.svelte'
    import Dashboard from './pages/privates/tasks/Dashboard.svelte'
    import Settings from './pages/privates/settings/Settings.svelte'

    const { url = '', isAuth = isUserAuthenticated() } = $props()
</script>

<Router {url}>
    <Route path="/"><BaseLayout {isAuth} content={presentation} /></Route>
    <Route path="/features"><BaseLayout {isAuth} content={features} /></Route>
    <Route path="/about"><BaseLayout {isAuth} content={about} /></Route>

    {#if isAuth}
        <Route path="/mfa"><BaseLayout {isAuth} content={mfa} /></Route>
        <Route path="/logout"><BaseLayout {isAuth} content={logout} /></Route>
        <Route path="/dashboard"><BaseLayout {isAuth} content={dashboard} {secondary} /></Route>
        <Route path="/settings"><BaseLayout {isAuth} content={settings} {settings} /></Route>

        <Route path="/groups"><BaseLayout {isAuth} content={groups} {secondary} /></Route>
        <Route path="/group/:id" let:params>
            <BaseLayout {isAuth} content={group} {secondary} />
        </Route>
        <Route path="/join-group">
            <BaseLayout {isAuth} content={joinGroup} {secondary} />
        </Route>
    {:else}
        <Route path="/login"><BaseLayout {isAuth} content={login} /></Route>
        <Route path="/register"><BaseLayout {isAuth} content={register} /></Route>
    {/if}
    <Route path="*"><BaseLayout {isAuth} content={notFound} /></Route>
</Router>

{#snippet presentation()}
    <Presentation />
{/snippet}

{#snippet features()}
    <Features />
{/snippet}

{#snippet about()}
    <About />
{/snippet}

{#snippet register()}
    <Register />
{/snippet}

{#snippet login()}
    <Login />
{/snippet}

{#snippet mfa()}
    <MFA />
{/snippet}

{#snippet logout()}
    <Logout />
{/snippet}

{#snippet secondary()}
    <MenuSecondary />
{/snippet}

{#snippet dashboard()}
    <Dashboard />
{/snippet}

{#snippet settings()}
    <Settings />
{/snippet}

{#snippet groups()}
    <Groups />
{/snippet}

{#snippet group()}
    <Group />
{/snippet}

{#snippet joinGroup()}
    <JoinGroup />
{/snippet}

{#snippet notFound()}
    Not Found
{/snippet}
