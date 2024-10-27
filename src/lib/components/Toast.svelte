<script>
    let { typeMessage = null, showMessage = null, message } = $props()

    function resetToast(e) {
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
        {@render message()}
        <button onclick={(e) => resetToast(e)}>&Cross;</button>
    </div>
{/if}
