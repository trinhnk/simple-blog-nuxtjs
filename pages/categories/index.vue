<template>
    <div class="container">
        <div class="my-5">
            <div class="title">
                <h1>Categories</h1>
            </div>
            <div class="add-new">
                <nuxt-link class="btn btn-success mt-4" to="/categories/create">Add New</nuxt-link>
            </div>

            <div class="list-all-item">
                <div class="row">
                    <div class="col-xl-3 col-lg-6 my-4" v-for="category in categories" :key="category.id">
                        <div class="card">
                            <img class="card-img-top" src="https://znews-photo.zadn.vn/w660/Uploaded/fsmyy/2019_07_05/geekbuyingRazerHammerheadProV2HeadphonesBlackandGreen467909.jpg" alt="Card image cap">
                            <div class="card-body">
                                <h3 class="card-title">{{ category.title }}</h3>
                                <p class="card-text">{{ category.description.substring(0,150) }}...</p>
                                <nuxt-link class="btn btn-primary" :to="{name: 'categories-id', params: {id: category.id}}">Go to {{ category.title }}</nuxt-link>
                                <div class="float-right">
                                    <nuxt-link class="btn btn-warning" :to="{name: 'categories-id-edit', params: {id: category.id}}">Edit</nuxt-link>
                                    <a class="btn btn-danger" href="javascript:void(0);">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categories: [],
        }
    },
    async asyncData({$axios}) {
        let {data, links, meta} = await $axios.$get('/categories')
        return {
            categories: data,
            links
        }
    },
}
</script>