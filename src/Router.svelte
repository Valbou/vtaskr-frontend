<script>
    import { Router, Link, Route } from 'svelte-routing'
    import { isUserAuthenticated } from '@/lib/iam/authentication.js'

    import BaseLayout from '@/global/layouts/BaseLayout.svelte'

    import About from '@/global/pages/About.svelte'
    import Presentation from '@/global/pages/Presentation.svelte'
    import Features from '@/global/pages/Features.svelte'

    import Register from '@/users/pages/Register.svelte'
    import Login from '@/users/pages/Login.svelte'
    import MFA from '@/users/pages/MFA.svelte'
    import Logout from '@/users/pages/Logout.svelte'
    import Groups from '@/users/pages/Groups.svelte'
    import Group from '@/users/pages/Group.svelte'
    import JoinGroup from '@/users/pages/JoinGroup.svelte'

    import MenuSecondary from '@/tasks/components/MenuSecondary.svelte'
    import Dashboard from '@/tasks/pages/Dashboard.svelte'

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

        <Route path="/groups"><BaseLayout {isAuth} content={groups} {secondary} /></Route>
        <Route path="/group/:id" let:params>
            <BaseLayout {isAuth} content={group} {secondary} />
        </Route>
        <Route path="/join-group/:hash" let:params>
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
