<template>
    <div class="container body-min-height">
        <div class="title pt-5">
            <h1>List Topics</h1>
        </div>
        <div class="list-topics mt-5 mb-5">
            <div v-for="(topic, index) in topics" :key="index" class="bg-light my-4 px-3 py-3">
                <nuxt-link :to="{name: 'topics-id', params: {id: topic.id}}">
                    <h2>{{ topic.title }}</h2>
                </nuxt-link>

                {{ user }}
                <p class="text-muted">{{ topic.created_at }} by {{ topic.user.name }}</p>
                <div v-for="(content, index) in topic.posts" :key="index" class="ml-5 content">
                    {{ content.body }}
                    <p class="text-muted mt-3">{{ content.created_at }} by {{ topic.user.name }}</p>
                </div>
            </div>
        </div>
        <nav>
            <ul class="pagination justify-content-center">
                <li v-for="(value, key) in links" :key="key" class="page-item" disabled>
                    <a @click="loadMore(value)" href="javascript:void(0);" class="page-link" :title="value">
                        <div class="text-uppercase">
                            {{key}}
                        </div>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            topics: [],
            links: []
        }
    },
    async asyncData({$axios}) {
        let {data, links, meta} = await $axios.$get('/topics')
        console.log(links)
        console.log(meta)
        return {
            topics: data,
            links
        }
    },
    methods: {
        async loadMore(url) {
            let {data} =  await this.$axios.$get(url)
            return this.topics = {...this.topics, ...data}
        },
    }
}
</script>