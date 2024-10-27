<script>
    let { menu } = $props()
</script>

<nav id="menu">
    <details class="mobile">
        <summary>
            <div>
                <span class="hbgr">
                    <span class="gauche"></span>
                    <span class="droite"></span>
                </span>
            </div>
        </summary>

        <div class="hovering">
            {@render menu()}
        </div>
    </details>
</nav>
