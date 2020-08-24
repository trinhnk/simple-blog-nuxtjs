<template>
    <div class="container body-min-height">
        <div class="pt-5">
            <div class="title text-center">
                <h1>List all Post</h1>
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
							<div class="col-md-8 content">
								<div class="item-category text-uppercase font-weight-bold text-black-50">
									<nuxt-link :to="{name: 'categories-id', params: {id: article.category.id}}">{{ article.category.title }}</nuxt-link>
								</div>
								<nuxt-link :to="{name: 'articles-id', params: {id: article.id}}">
									<h3 class="item-title">{{ article.title }}</h3>
								</nuxt-link>
								<p class="card-text">{{ article.description.substring(0,150) }}...</p>
								<div class="date-details text-muted"><small>{{ article.updated_at }}</small></div>
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
				<!-- <li class="page-item">
					<a @click="loadMore('http://backend2.local/api/articles?page=1')" href="javascript:void(0);" class="page-link" >1</a>
				</li> -->
				<!-- <li class="page-item">
					<a @click="loadMore('http://backend2.local/api/articles?page=2')" href="javascript:void(0);" class="page-link" >2</a>
				</li> -->
				<!-- <li class="page-item">
					<a @click="loadMore('http://backend2.local/api/articles?page=3')" href="javascript:void(0);" class="page-link" >3</a>
				</li> -->
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
export default {
    data() {
        return {
            articles: [],
        }
    },
    async asyncData({$axios}) {
        let {data, links, meta} = await $axios.$get('/articles')
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
			// return this.articles = {...this.articles, ...data}
			return [
				this.articles = {...this.articles, ...data},
				this.links = links,
				this.meta = meta,
			]
        },
    },
}
</script>

<style scoped>
	li{
		border-bottom: 1px solid #cccccc;
	}
</style>