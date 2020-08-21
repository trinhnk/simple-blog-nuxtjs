<template>
    <div class="container body-min-height">
        <div class="title pt-5">
            <h1>{{ topic.title }}</h1>
        </div>
        <hr>
        <p class="text-muted">{{topic.created_at}} by {{topic.user.name}}</p>
        <div v-for="(content, index) in topic.posts" :key="index" class="ml-5 content">
            <p>{{content.body}}</p>
            <!-- <pre>{{ content }}</pre> -->

            <!-- <div v-if="authenticated"> -->
            <!-- <div v-if="user.id === content.user.id"> -->
            <button @click="deletePost(content.id)" class="btn btn-outline-danger fa fa-trash  pull-right"></button>
            
            <nuxt-link :to="{name: 'topics-posts-edit', params: {id: $route.params.id, body: content.id}}">
                <button class="btn btn-outline-success fa fa-edit pull-right"></button>
            </nuxt-link>
            <p class="text-muted">{{content.created_at}} by {{content.user.name}}</p>
        </div>
        <hr>
        <nuxt-link to="/topics">Back to list posts</nuxt-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            topic: '',
            body: ''
        }
    },
    async asyncData({ $axios, params }) {
        const { data } = await $axios.$get(`/topics/${params.id}`)
        return {
        topic: data
        }
    }
}
</script>