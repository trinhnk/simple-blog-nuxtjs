<template>
    <div class="container body-min-height">
        <div class="py-5 text-center">
            <h1 v-if="error.statusCode === 404">Page not found</h1>
            <h1 v-else>An error occurred</h1>
            <nuxt-link class="text-primary" to="/"><strong>Home page</strong></nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ['error'],
}
</script>