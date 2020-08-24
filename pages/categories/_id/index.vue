<template>
    <div class="container">
        <div class="my-5">
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
									{{ article.category.title }}
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
    </div>
</template>

<script>
export default {
    data() {
        return {
            articles: [],
        }
    },
    async asyncData({$axios, params}) {
        let {data, links, meta} = await $axios.$get(`/categories/${params.id}/details`)
        return {
            articles: data,
            links
        }
    },
}
</script>

<style scoped>
	li{
		border-bottom: 1px solid #cccccc;
	}
</style>