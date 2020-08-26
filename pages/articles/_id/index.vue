<template>
    <div class="container body-min-height">
        <div class="py-5">
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
            <div class="divider my-4">
                <hr>
            </div>
            <h3>Comments</h3>
            <div v-if="authenticated" class="pl-4">
                <div class="col-md-8">
                    <form @submit.prevent="send">
                        <div class="form-group">
                            <textarea class="form-control" v-model="send_comment.content" rows="3"  placeholder="Type comment" required></textarea>
                        </div>
                        <div class="mb-5">
                            <button type="submit" class="btn btn-primary">Send</button>
                        </div>
                    </form>
                </div>
            </div>
            <div v-if="comments.length">
                <ul>
                    <li v-for="comment in comments" :key="comment.id">
                        <div class="comment-box col-md-8">
                            <div class="row">
                                <div class="col-md-1">
                                    <img class="avatar" src="https://www.w3schools.com/howto/img_avatar.png" alt="">
                                </div>
                                <div class="col-md-11">
                                    <div class="info-account">
                                        <div>
                                            <span class="name float-left font-weight-bold py-2 pl-3">{{ comment.user.name }}</span>
                                            <span class="interval float-right">
                                                <small class="text-muted">
                                                    {{ comment.created_at }}
                                                </small>
                                            </span>
                                        </div>
                                        <div class="clearfix"></div>
                                        <div class="content pl-3">
                                            {{ comment.content }}
                                        </div>
                                        <div class="delete-comment float-right">
                                            <button class="btn btn-danger" @click="deleteComment(comment.id)">
                                                <i class="fas fa-trash fa-fw text-white"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-else class="pl-5">Post no comments</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            article: {},
            comments: [],
            send_comment: {
                content: '',
                article_id: this.$route.params.id
            }
        }
    },
    async asyncData({$axios, params}) {
        const article = await $axios.$get(`/articles/${params.id}`)
        const comments = await $axios.$get(`/comments/${params.id}`)
        return {
            article: article.data,
            comments: comments.data,
        }
    },
    methods: {
        async send() {
            try{
                let _seft = this
                await this.$axios.$post(`/comments/create`, this.send_comment)
                const {data} = await this.$axios.$get(`/comments/${this.$route.params.id}`)
                return this.comments = data
            } catch (errors) {
                console.log(errors)
            }
        },
        async deleteComment(id) {
            try{
                let _seft = this
                await this.$axios.$delete(`/comments/${id}`)
                const {data} = await this.$axios.$get(`/comments/${this.$route.params.id}`)
                return this.comments = data
            } catch (errors) {
                console.log(errors)
            }
        },
    },
    head() {
        return {
            title: this.article.title,
            meta: []
        }
    }
}
</script>

<style scoped>
.comment-box{
    border: 1px solid #ccc;
    background: #E7E7E7;
    padding: 5px 20px;
    margin: 20px 0;
}
.comment-box img{
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    float: none;
    margin-right: 0;
}
</style>