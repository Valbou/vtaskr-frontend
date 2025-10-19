<script>
    let { message, result, clean } = $props()
    let showMessage = $state(true)

    function resetToast(e) {
        showMessage = false
        clean()
    }

    let cssClass = $derived.by(() => {
        return result.isOk ? "success" : "error"
    })

    function resetToastByKey(event) {
        if (event.key === "Escape") {
            resetToast()
        }
    }
</script>

{#if showMessage}
    <div class="toast {cssClass}">
        {@render message(result)}
        <button onclick={(e) => resetToast(e)}>&Cross;</button>
    </div>
{/if}
