<template>
    <div class="container body-min-height">
        <div class="pt-5">
            <div class="title text-center">
                <h1>List all User</h1>
            </div>
            <div class="create-user py-4 text-center">
                <nuxt-link class="btn btn-success" to="/users/create">Add new</nuxt-link>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users_list" :key="index">
                        <th scope="row">{{index+1}}</th>
                        <td>{{ user.id }}</td>
                        <td><strong>
                            <nuxt-link :to="{name: 'users-id', params: {id: user.id}}">{{ user.name }}</nuxt-link>
                        </strong></td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.roles[0].name }}</td>
                        <td>
                            <nuxt-link class="btn btn-warning my-2" :to="{name: 'users-id-edit', params: {id: user.id}}">
                                <i class="fas fa-edit fa-fw text-white"></i>
                            </nuxt-link>
                            <button class="btn btn-danger" @click="deleteUser(user.id)">
                                <i class="fas fa-trash fa-fw text-white"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
		<!-- <nav aria-label="Page navigation example">
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
		</nav> -->
        <!-- <pre>{{users_list[1].roles[0].name}}</pre> -->
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    data() {
        return {
            users_list: [],
        }
    },
    async asyncData({$axios}) {
        let {data, links, meta} = await $axios.$get('/listusers')
        return {
            users_list: data,
			links,
			meta
        }
	},
	methods: {
        async loadMore(url) {
			let {data, links, meta} =  await this.$axios.$get(url)
			// return this.articles = {...this.articles, ...data}
			return [
				this.articles = data,
				this.links = links,
				this.meta = meta,
			]
        },
        async deleteUser(id) {
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
                        _sefl.$axios.$delete(`/listusers/${id}`)
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
}
</script>