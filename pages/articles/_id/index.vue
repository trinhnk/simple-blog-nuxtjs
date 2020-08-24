<template>
    <div class="container">
        <div class="my-5">
            <div class="text-center">
                <h1>{{ article.title }}</h1>
                <div class="review-intro">{{ article.description }}</div>
            </div>
            <div class="post-author text-center text-black-50">
                <small>
                    <span class="author-name">{{ article.user.name }}</span>
                    <span class="vertical-bar"> | </span>
                    <span class="date-time">{{ article.updated_at }}</span>
                </small>
            </div>
            <div class="divider my-4">
                <hr>
            </div>
            <div class="article-body">
                <div v-html="article.content"></div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            article: {},
        }
    },
    async asyncData({$axios, params}) {
        let {data} = await $axios.$get(`/articles/${params.id}`)
        return {
            article: data,
        }
    },
}
</script>