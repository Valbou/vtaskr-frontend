<template>
    <footer>
        <nav>
            <RouterLink to="/" v-if="this.$route.path != '/'">Login</RouterLink>
            <RouterLink to="/about" v-if="this.$route.path != '/about'">About</RouterLink>
            <RouterLink to="/register" v-if="this.$route.path != '/register'">Register</RouterLink>
        </nav>
    </footer>
</template>