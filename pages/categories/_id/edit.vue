<template>
    <div class="container col-md-6 mt-5">
        <h2>Edit category</h2>
        <br>
        <form @submit.prevent="update">
        <div class="form-group">
            <label><strong>Title:</strong></label>
            <input v-model="category.title" type="text" class="form-control" placeholder="Enter category title" autofocus>
            <small class="form-text text-danger" v-if="errors.title">{{errors.title[0]}}</small>
        </div>
        <!-- <div class="form-group">
            <label><strong>Slug:</strong></label>
            <input v-model="category.slug" type="text" class="form-control">
            <small class="form-text text-danger" v-if="errors.slug">{{errors.slug[0]}}</small>
        </div> -->
        <div class="form-group">
            <label><strong>Description:</strong></label>
            <textarea v-model="category.description" class="form-control" rows="5"></textarea>
            <small class="form-text text-danger" v-if="errors.description">{{errors.description[0]}}</small>
        </div>
        <div class="mb-5">
            <button type="submit" class="btn btn-primary">Save</button>

        </div>
        </form>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
	middleware: ['auth', 'adminRole'],
	data() {
		return {
			category: {
				title: '',
				slug: '',
				description: '',
			}
		}
	},
	async asyncData({$axios, params}) {
		const {data} = await $axios.$get(`/categories/${params.id}`)
		return {category: data}
	},
	methods: {
		async update() {
			try{
				let _seft = this
				await this.$axios.$patch(`/categories/${this.$route.params.id}`, this.category)
				Swal.fire({
					type: 'success',
					title: 'Success',
					text: 'Category has been updated successfully',
				}).then(function(){
					return _seft.$router.push('/categories');
				})
			} catch (errors) {
				console.log(errors)
			}
		}
	}
}
</script>

