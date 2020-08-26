<template>
	<div class="container col-md-6 body-min-height">
		<div class="py-5">
		<h2>Create a new category</h2>
		<br>
		<form @submit.prevent="create">
			<div class="form-group">
				<label><strong>Title:</strong></label>
				<input v-model="form.title" type="text" class="form-control" placeholder="Enter category title" autofocus>
				<small class="form-text text-danger" v-if="errors.title">{{errors.title[0]}}</small>
			</div>
			<!-- <div class="form-group">
				<label><strong>Slug:</strong></label>
				<input v-model="form.slug" type="text" class="form-control">
				<small class="form-text text-danger" v-if="errors.slug">{{errors.slug[0]}}</small>
			</div> -->
			<div class="form-group">
				<label><strong>Description:</strong></label>
				<textarea v-model="form.description" class="form-control" rows="5"></textarea>
				<small class="form-text text-danger" v-if="errors.description">{{errors.description[0]}}</small>
			</div>
			<div class="mb-5">
				<button type="submit" class="btn btn-primary">Create</button>
			</div>
		</form>

		</div>
	</div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    middleware: ['auth', 'adminRole'],
    data() {
        return {
            form: {
                title: '',
                slug: '',
                description: '',
            }
        }
    },
    methods: {
        async create() {
            try{
                let _seft = this
                await this.$axios.$post('/categories/create', this.form)
                Swal.fire({
                    type: 'success',
                    title: 'Success',
                    text: 'Topic has been created successfully',
                }).then(function(){
                    return _seft.$router.push('/categories');
                })
            } catch (errors) {
                console.log(errors.response.status)
                // Swal.fire({
                //     type: 'error',
                //     title: 'Oops...',
                //     text: errors.response.data.errors.email[0],
                // })
            }
        }
    },
    head() {
        return {
            title: 'Create a new category',
            meta: []
        }
    }
}
</script>