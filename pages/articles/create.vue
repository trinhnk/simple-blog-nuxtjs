<template>
  <div class="container col-md-8 my-5">
    <h1>Create a new article</h1>
    <br>
    <form @submit.prevent="create">
        <div class="form-group">
            <label><strong>Title:</strong></label>
            <input v-model="article.title" type="text" class="form-control" placeholder="Enter article title" autofocus>
            <small class="form-text text-danger" v-if="errors.title">{{errors.title[0]}}</small>
        </div>
        <div class="form-group">
            <label><strong>Slug:</strong></label>
            <input v-model="article.slug" type="text" class="form-control">
            <small class="form-text text-danger" v-if="errors.slug">{{errors.slug[0]}}</small>
        </div>
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
                <option value="" disabled selected>Category...</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
            </select>
            <small class="form-text text-danger" v-if="errors.category_id">{{errors.category_id[0]}}</small>
        </div>
        <button type="submit" class="btn btn-primary mt-4">Create</button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    middleware: ['auth'],
    data() {
        return {
            article: {
                title: '',
                slug: '',
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
    methods: {
        async create() {
            try{
                let _seft = this
                await this.$axios.$post('/articles/create', this.article)
                Swal.fire({
                    type: 'success',
                    title: 'Success',
                    text: 'Topic has been created successfully',
                }).then(function(){
                    return _seft.$router.push('/');
                })
            } catch (errors) {
                console.log(errors)
            }
        }
    },
    head() {
        return {
            title: 'Create a new article',
            meta: []
        }
    }
}
</script>