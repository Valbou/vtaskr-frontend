<script>
    import { Router, Link, Route } from 'svelte-routing'
    import { isUserAuthenticated } from '@/lib/iam/authentication.js'

    import BaseLayout from '@/global/layouts/BaseLayout.svelte'

    import About from '@/global/pages/About.svelte'
    import Presentation from '@/global/pages/Presentation.svelte'

    import Register from '@/users/pages/Register.svelte'
    import Login from '@/users/pages/Login.svelte'
    import MFA from '@/users/pages/MFA.svelte'
    import Logout from '@/users/pages/Logout.svelte'
    import Groups from '@/users/pages/Groups.svelte'
    import Group from '@/users/pages/Group.svelte'
    import JoinGroup from '@/users/pages/JoinGroup.svelte'

    import Dashboard from '@/tasks/pages/Dashboard.svelte'

    export let url = ''
</script>

<Router {url}>
    <BaseLayout>
        <Route path="/"><Presentation /></Route>
        <Route path="/login"><Login /></Route>
        <Route path="/about"><About /></Route>

        {#if isUserAuthenticated()}
            <Route path="/mfa"><MFA /></Route>
            <Route path="/logout"><Logout /></Route>
            <Route path="/dashboard"><Dashboard /></Route>

            <Route path="/groups"><Groups /></Route>
            <Route path="/group/:id" let:params>
                <Group groupId="{params.id}" />
            </Route>
            <Route path="/join-group/:hash" let:params>
                <JoinGroup inviteHash="{params.hash}" />
            </Route>
        {:else}
            <Route path="/register"><Register /></Route>
        {/if}

        <Route path="*">Not Found</Route>
    </BaseLayout>
</Router>
