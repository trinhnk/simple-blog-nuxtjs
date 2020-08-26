<template>
    <div class="container body-min-height">
        <div class="py-5">
            <div class="text-center">
                <h1>My Articles</h1>
            </div>
            <br>
            <div class="text-center">
                <nuxt-link class="btn btn-success" to="/articles/create">Add New</nuxt-link>
            </div>
            <div class="list-all-item mt-5">
                <ul class="listing-items">
                    <li class="listing-item mb-4 pb-4" v-for="article in articles" :key="article.id">
                        <div class="row">
                            <div class="col-md-4 media">
                                <div class="image">
                                    <img class="card-img-top" src="https://znews-photo.zadn.vn/w660/Uploaded/fsmyy/2019_07_05/geekbuyingRazerHammerheadProV2HeadphonesBlackandGreen467909.jpg" alt="Card image cap">
                                </div>
                            </div>
                            <div class="col-md-7 content">
                                <div class="item-category text-uppercase font-weight-bold">
                                    <nuxt-link class="text-black-50" :to="{name: 'categories-id', params: {id: article.category.id}}">{{ article.category.title }}</nuxt-link>
                                </div>
                                <nuxt-link class="listing-item-title" :to="{name: 'articles-id', params: {id: article.id}}">
                                    <h3 class="item-title">{{ article.title }}</h3>
                                </nuxt-link>
                                <p class="card-text">{{ article.description.substring(0,150) }}...</p>
                                <div class="date-details text-muted">
                                    <strong>{{ article.user.name }}</strong>
                                    <small> POSTED ON {{ article.updated_at }}</small>
                                </div>
                            </div>
                            <div class="col-md-1 action">
                                <template v-if="user.role_id == 1|user.role_id == 2">
                                    <nuxt-link class="btn btn-warning my-2" :to="{name: 'articles-id-edit', params: {id: article.id}}"><i class="fas fa-edit fa-fw text-white"></i></nuxt-link>
                                    <button class="btn btn-danger my-2" @click="deleteArticle(article.id)"><i class="fas fa-trash fa-fw text-white"></i></button>
                                </template>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <nav aria-label="Page navigation example">
			<ul class="pagination justify-content-center">
				<li class="page-item" v-if="meta.current_page >= 2">
					<a class="page-link" @click="loadMore(links.prev)" href="javascript:void(0);" aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
						<span>Prev</span>
					</a>
				</li>
				<li class="page-item" v-if="meta.current_page < meta.last_page">
					<a class="page-link" @click="loadMore(links.next)" href="javascript:void(0);" aria-label="Next">
						<span>Next</span>
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>
		</nav>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    middleware: ['auth', 'writerRole'],
    data() {
        return {
            articles: [],
        }
    },
    async asyncData({$axios, store}) {
        let {data, links, meta} = await $axios.$get(`/articles/user/${store.state.auth.user.id}`)
        return {
            articles: data,
			links,
			meta
        }
    },
    methods: {
        async loadMore(url) {
			console.log(url)
			let {data, links, meta} =  await this.$axios.$get(url)
			return [
				this.articles = data,
				this.links = links,
				this.meta = meta,
			]
        },
        async deleteArticle(id) {
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
                        _sefl.$axios.$delete(`/articles/${id}`)
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
            title: 'Articles',
            meta: []
        }
    }
}
</script>

<style scoped>
	.listing-items>li{
		border-bottom: 1px solid #cccccc;
	}
	.listing-item-title{
		color: #222529;
	}
</style>