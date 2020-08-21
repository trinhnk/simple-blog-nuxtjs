<template>
  <div class="container col-md-6 mt-5">
    <h2>Create a new topic</h2>
    <br>
    <form @submit.prevent="create">
      <div class="form-group">
        <label><strong>Topic title:</strong></label>
        <input v-model="form.title" type="text" class="form-control" placeholder="Enter topic title" autofocus>
        <small class="form-text text-danger" v-if="errors.title">{{errors.title[0]}}</small>
      </div>
      <div class="form-group">
        <label><strong>Topic body:</strong></label>
        <textarea v-model="form.body" class="form-control" rows="5"></textarea>
        <small class="form-text text-danger" v-if="errors.body">{{errors.body[0]}}</small>
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    middleware: ['auth'],
    data() {
        return {
            form: {
            title: '',
            body: ''
            }
        }
    },
    methods: {
        async create() {
            try{
                let _seft = this
                await this.$axios.$post('/topics', this.form)
                Swal.fire({
                    type: 'success',
                    title: 'Success',
                    text: 'Topic has been created successfully',
                }).then(function(){
                    return _seft.$router.push('/');
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
    }
}
</script>

<style>
:root{--input-padding-x:1.5rem;--input-padding-y:.75rem}
body{background: #ffffff;}
</style>