<template>
    <div class="container col-md-8 body-min-height">
        <div class="py-5">
            <h1>Create a new user</h1>
            <br>
            <form @submit.prevent="create">
                <div class="form-group">
                    <label><strong>Name:</strong></label>
                    <input v-model="new_user.name" type="text" class="form-control" required autofocus>
                    <small class="form-text text-danger" v-if="errors.name">{{errors.name[0]}}</small>
                </div>
                <div class="form-group">
                    <label><strong>Email:</strong></label>
                    <input v-model="new_user.email" type="text" class="form-control" required>
                    <small class="form-text text-danger" v-if="errors.email">{{errors.email[0]}}</small>
                </div>
                <div class="form-group">
                    <label><strong>Password:</strong></label>
                    <input v-model="new_user.password" type="password" class="form-control" required>
                    <small class="form-text text-danger" v-if="errors.password">{{errors.password[0]}}</small>
                </div>
                <!-- <div class="form-group">
                    <label><strong>Confirm Password:</strong></label>
                    <input v-model="article.content" type="password" class="form-control" required>
                    <small class="form-text text-danger" v-if="errors.content">{{errors.content[0]}}</small>
                </div> -->
                <div class="dropdown show">
                    <label><strong>Role:</strong></label>
                    <select class="form-control form-control-lg" v-model="new_user.role_id">
                        <option value="3" selected>Member</option>
                        <option value="2">Writer</option>
                    </select>
                    <small class="form-text text-danger" v-if="errors.role_id">{{errors.role_id[0]}}</small>
                </div>
                <button type="submit" class="btn btn-primary mt-4">Create</button>
            </form>

        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    middleware: ['auth'],
    data() {
        return {
            new_user: {
                name: '',
                email: '',
                password: '',
                role_id: '3'
            },
        }
    },
    methods: {
        async create() {
            try{
                let _seft = this
                console.log(this.new_user.role_id)
                await this.$axios.$post('/listusers/create', this.new_user)
                Swal.fire({
                    type: 'success',
                    title: 'Success',
                    text: 'Success',
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