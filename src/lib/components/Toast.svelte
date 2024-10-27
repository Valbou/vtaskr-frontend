<script>
    let { typeMessage = null, showMessage = null } = $props()

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
