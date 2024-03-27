<script>
    export let typeMessage = null
    export let showMessage = true

    function resetToast() {
        showMessage = false
    }

    function resetToastByKey(event) {
        if (event.key === "Escape") {
            resetToast()
        }
    }
</script>

{#if typeMessage && showMessage}
    <div class="toast {typeMessage}">
        <slot name="message" />
        <button on:click={() => resetToast()}>&Cross;</button>
    </div>
{/if}
