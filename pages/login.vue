<template>
    <div class="container-fluid login-content">
        <div class="container">
            <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="card card-signin my-5">
                        <div class="card-body">
                            <h5 class="card-title text-center">Log in</h5>

                            <form @submit.prevent="submit" class="form-signin">
                                <div class="form-label-group">
                                    <input v-model="form.email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                                    <label for="inputEmail">Email address</label>
                                </div>

                                <div class="form-label-group">
                                    <input v-model="form.password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                                    <label for="inputPassword">Password</label>
                                </div>

                                <!-- <div class="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" class="custom-control-input" id="customCheck1">
                                    <label class="custom-control-label" for="customCheck1">Remember password</label>
                                </div> -->
                                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Log in</button>
                                <hr class="my-4">
                                <!-- <button class="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> Sign in with Google</button> -->
                                <!-- <button class="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button> -->
                                <!-- <hr class="my-4"> -->
                                <div class="d-flex justify-content-center links">Don't have an account?
                                    <nuxt-link class="pl-1 text-primary" to="/signup">Sign Up</nuxt-link>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    middleware: 'guest',
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        async submit() {
            try {
                await this.$auth.loginWith("local", {
                    data: this.form
                })
                // this.$router.push('/')
                console.log(this.$route.path)
                // this.$router.push({
                //     path: this.$route.query.redirect || "/dashboard"
                // })
            } catch (errors) {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: errors.response.data.errors.email[0],
                })
            }
        }
    },
    head() {
        return {
            title: 'Log in',
            meta: []
        }
    }
}
</script>

<style scoped>
.login-content{--input-padding-x:1.5rem;--input-padding-y:.75rem}
.login-content{background:#007bff;background:linear-gradient(to right,#0062E6,#33AEFF)}
</style>