<template>
    <div>
        <h1>This is post</h1>
        <div class="url">{{ url }}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            url: this.$route
        }
    },
}
</script>