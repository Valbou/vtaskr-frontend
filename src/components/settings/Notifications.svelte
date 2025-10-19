<script>
    import { onMount } from 'svelte'

    import { getAllSubscriptions } from '../../domain/settings/api/subscriptions_api.js'
    import Trans from "../../libs/i18n/components/Trans.svelte"

    let telegram_active = false
    let sms_active = false
    let subscriptions = $state([])

    // TODO: get events from backend and add a checkox click event to update state
    // TODO: auto detect if contact is ready for another col option like Telegram
    // TODO: add a process to redister to telegram

    onMount(async () => {
        subscriptions = await getAllSubscriptions()
    })
</script>

<section>
    <h2><Trans textKey="users:settings:notifications_title" /></h2>
    <table>
        <thead>
            <tr>
                <td><Trans textKey="users:settings:notifications_event" /></td>
                <td><Trans textKey="users:settings:notifications_col_email" /></td>
                {#if telegram_active}
                    <td><Trans textKey="users:settings:notifications_col_telegram" /></td>
                {/if}
                {#if sms_active}
                    <td><Trans textKey="users:settings:notifications_col_sms" /></td>
                {/if}
            </tr>
        </thead>
        <tbody>
            {#each subscriptions as subscription}
                <tr>
                    <td>{subscription.name}</td>
                    <td><input type="checkbox" /></td>
                    {#if telegram_active}
                    <td><input type="checkbox" /></td>
                    {/if}
                    {#if sms_active}
                        <td><input type="checkbox" /></td>
                    {/if}
                </tr>
            {/each}
            <tr></tr>
        </tbody>
    </table>
</section>
