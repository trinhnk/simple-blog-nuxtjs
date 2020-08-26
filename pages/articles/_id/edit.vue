<template>
    <div class="container col-md-8 body-min-height">
        <div class="py-5">
            <h1>Edit article</h1>
            <br>
            <form @submit.prevent="update">
                <div class="form-group">
                    <label><strong>Title:</strong></label>
                    <input v-model="article.title" type="text" class="form-control" placeholder="Enter article title" autofocus>
                    <small class="form-text text-danger" v-if="errors.title">{{errors.title[0]}}</small>
                </div>
                <!-- <div class="form-group">
                    <label><strong>Slug:</strong></label>
                    <input v-model="article.slug" type="text" class="form-control">
                    <small class="form-text text-danger" v-if="errors.slug">{{errors.slug[0]}}</small>
                </div> -->
                <div class="form-group">
                    <label><strong>Description:</strong></label>
                    <textarea v-model="article.description" class="form-control" rows="2"></textarea>
                    <small class="form-text text-danger" v-if="errors.description">{{errors.description[0]}}</small>
                </div>
                <div class="form-group">
                    <label><strong>Content:</strong></label>
                    <textarea v-model="article.content" class="form-control" rows="10"></textarea>
                    <small class="form-text text-danger" v-if="errors.content">{{errors.content[0]}}</small>
                </div>
                <div class="dropdown show">
                    <select class="form-control form-control-lg" v-model="article.category_id">
                        <option value="" disabled>Category...</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
                    </select>
                    <small class="form-text text-danger" v-if="errors.category_id">{{errors.category_id[0]}}</small>
                </div>
                <button type="submit" class="btn btn-primary mt-4">Save</button>
            </form>
        </div>
        <pre>{{article}}</pre>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    middleware: ['auth', 'writerRole'],
    data() {
        return {
            article: {
                title: '',
                description: '',
                content: '',
                category_id: ''
            },
            categories: []
        }
    },
    async asyncData({$axios, params}) {
		const {data} = await $axios.$get('/categories')
		return {categories: data}
    },
    async asyncData({$axios, params}) {
        const article = await $axios.$get(`/articles/${params.id}`)
        const categories = await $axios.$get('/categories')
        return {
            article: article.data,
            // {
            //     title: article.data.title,
            //     description: article.data.description,
            //     content: article.data.content,
            //     category_id: article.data.category.id,
            // },
            categories: categories.data,
        }
    },
    methods: {
        async update() {
            // try{
                // let _seft = this
                console.log(this.article.category_id)
                await this.$axios.$patch(`/articles/${this.$route.params.id}`, {
                    title: this.article.title,
                    description: this.article.description,
                    content: this.article.content,
                    category_id: this.article.category_id,
                })
                // Swal.fire({
                //     type: 'success',
                //     title: 'Success',
                //     text: 'Topic has been updated successfully',
                // }).then(function(){
                    return this.$router.push('/');
                // })
            // } catch (errors) {
            //     console.log(errors)
            // }
        }
    },
    head() {
        return {
            title: 'Edit article',
            meta: []
        }
    }
}
</script>