<template>
    <div class="container">
        <div class="my-5">
            <div class="title">
                <h1>Categories</h1>
            </div>
            <template v-if="authenticated">
                <div class="add-new" v-if="user.role_id == 1">
                    <nuxt-link class="btn btn-success mt-4" to="/categories/create">Add New</nuxt-link>
                </div>
            </template>

            <div class="list-all-item">
                <div class="row">
                    <div class="col-xl-4 col-lg-6 my-4" v-for="category in categories" :key="category.id">
                        <div class="card">
                            <img class="card-img-top" src="https://znews-photo.zadn.vn/w660/Uploaded/fsmyy/2019_07_05/geekbuyingRazerHammerheadProV2HeadphonesBlackandGreen467909.jpg" alt="Card image cap">
                            <div class="card-body">
                                <nuxt-link :to="{name: 'categories-id', params: {id: category.id}}">
                                    <h3 class="card-title">{{ category.title }}</h3>
                                </nuxt-link>
                                <p class="card-text">{{ category.description.substring(0,140) }}...</p>
                                <nuxt-link class="btn btn-primary" :to="{name: 'categories-id', params: {id: category.id}}">Go to {{ category.title }}</nuxt-link>
                                <template v-if="authenticated">
                                    <div class="float-right" v-if="user.role_id == 1">
                                        <nuxt-link class="btn btn-warning" :to="{name: 'categories-id-edit', params: {id: category.id}}">Edit</nuxt-link>
                                        <button class="btn btn-danger" @click="deleteCategory(category.id)">Delete</button>
                                    </div>
                                </template>
                            </div>
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
    data() {
        return {
            categories: [],
            // user: this.$auth.user,
        }
    },
    async asyncData({$axios}) {
        let {data, links, meta} = await $axios.$get('/categories')
        return {
            categories: data,
            links
        }
    },
    methods: {
        async deleteCategory(id) {
            try {
                let _sefl = this
                await Swal.fire({
                    title: 'Are you sure?',
                    type: 'question',
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    showCancelButton: true,
                    showCloseButton: true
                }).then((ok) => {
                    if (ok.value) {
                        _sefl.$axios.$delete(`/categories/${id}`)
                        _sefl.$router.push('/')
                    }else{
                        console.log('cancel')
                    }
                })
            } catch (e) {
                console.log('error:', e);
            }
        },
    },
    head() {
        return {
            title: 'Categories',
            meta: []
        }
    }
}
</script>