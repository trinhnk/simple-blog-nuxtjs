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
                        <li class="nav-item active">
                            <nuxt-link class="nav-link" to="/">Home</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <nuxt-link class="nav-link" to="/topics">Blog</nuxt-link>
                        </li>
                    </ul>
                    <template v-if="!authenticated">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <nuxt-link class="nav-link" to="/login">Log in</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link class="nav-link" to="/signup">Sign up</nuxt-link>
                            </li>
                        </ul>
                    </template>
                    <template v-if="authenticated">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <nuxt-link class="nav-link" to="/dashboard">Dashboard</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <!-- <a class="nav-link" href="javascript:void(0);">{{ user.name }}</a> -->
                                <nuxt-link class="nav-link" to="/profile">{{ user.name }}</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="javascript:void(0);" @click.prevent="logout()">Log out</a>
                            </li>
                        </ul>
                    </template>
                    <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            this.$auth.logout()
        }
    }
}
</script>