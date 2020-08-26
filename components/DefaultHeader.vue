<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container">
                <nuxt-link class="navbar-brand" to="/">Simple Blog</nuxt-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item" :class="[(this.$route.path == '/') ? 'active' : '']">
                            <nuxt-link class="nav-link" to="/">Home</nuxt-link>
                        </li>
                        <!-- <li class="nav-item" :class="[(this.$route.path == '/topics') ? 'active' : '']">
                            <nuxt-link class="nav-link" to="/topics">Blog</nuxt-link>
                        </li> -->
                        <li class="nav-item" :class="[(this.$route.path == '/categories') ? 'active' : '']">
                            <nuxt-link class="nav-link" to="/categories">Categories</nuxt-link>
                        </li>
                    </ul>
                    <template v-if="!authenticated">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item" :class="[(this.$route.path == '/login') ? 'active' : '']">
                                <nuxt-link class="nav-link" to="/login">Log in</nuxt-link>
                            </li>
                            <li class="nav-item" :class="[(this.$route.path == '/signup') ? 'active' : '']">
                                <nuxt-link class="nav-link" to="/signup">Sign up</nuxt-link>
                            </li>
                        </ul>
                    </template>
                    <template v-if="authenticated">
                        <ul class="navbar-nav ml-auto">
                            <!-- <li class="nav-item" :class="[(this.$route.path == '/dashboard') ? 'active' : '']">
                                <nuxt-link class="nav-link" to="/dashboard">Dashboard</nuxt-link>
                            </li> -->
                            <li class="nav-item" :class="[(this.$route.path == '/articles') ? 'active' : '']" v-if="user.role_id == 1|user.role_id == 2">
                                <nuxt-link class="nav-link" to="/articles">Articles</nuxt-link>
                            </li>
                            <li class="nav-item" :class="[(this.$route.path == '/users') ? 'active' : '']" v-if="user.role_id == 1">
                                <nuxt-link class="nav-link" to="/users">Users</nuxt-link>
                            </li>
                            <!-- <li class="nav-item" :class="[(this.$route.path == '/categories') ? 'active' : '']">
                                <nuxt-link class="nav-link" to="/categories">Categories</nuxt-link>
                            </li> -->
                            <li class="nav-item" :class="[(this.$route.path == '/profile') ? 'active' : '']">
                                <!-- <a class="nav-link" href="javascript:void(0);">{{ user.name }}</a> -->
                                <nuxt-link class="nav-link" to="/profile">{{ user.name }}</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="javascript:void(0);" @click.prevent="logout()">Log out</a>
                            </li>
                        </ul>
                    </template>
                    <form class="form-inline my-2 my-lg-0" @submit.prevent="search">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="searchText">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    data() {
        return {
            router: this.$route.path,
            searchText: ''
        }
    },
    methods: {
        logout() {
            this.$auth.logout()
        },
        search() {
            // console.log(this.searchText)
            return this.$router.push(`/search?s=${this.searchText}`);
        }
    }
}
</script>