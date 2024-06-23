<script>
    import { Link } from 'svelte-routing'
</script>

<section class="presentation">
    <h1>vTaskr - Task Manager</h1>
    <p>vTaskr is an open source task manager that can help you to organize and memorize tasks.</p>
    <p>It provide some features to permit collaborative project:</p>
    <ul>
        <li>Create and manage tasks</li>
        <li>Eisenhower matrix can help you to priorize tasks</li>
        <li>Create groups and invite collaborators</li>
        <li>Use tags to organize tasks in a group</li>
        <li>Use reminder by email or telegram</li>
        <li>Privacy by design</li>
        <li>Many others features are comming... <a href="https://github.com/Valbou/vtaskr-frontend" title="Link to Github vTaskr" target="_blank" rel="external">follow us on github</a></li>
    </ul>
    <p>vTaskr is free for all (SaaS and on-premise), but this can evolve in the futur for large users in SaaS mode only (cloud). It depends on user's generousity, if it's enough to maintain vTaskr infrastructure and code.</p>
    <p><Link class="button" to="/register">Register</Link> or <Link class="button" to="/login">Login</Link> for free.</p>
    <p>You need more features, you experience an issue, please <a href="https://github.com/Valbou/vtaskr-frontend/issues" target="_blank" rel="external">create an issue on github project</a></p>
</section>
