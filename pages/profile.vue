<template>
    <div class="container body-min-height">
        <div class="py-5">
            <div class="title text-center">
                <h2>User Profile</h2>
            </div>
            <form action="" class="user-profile col-md-6 offset-md-3">
                <div class="form-group">
                    <label><strong>Name:</strong></label>
                    <input type="text" class="form-control" :value="profile.data.name" disabled>
                </div>
                <div class="form-group">
                    <label><strong>Email:</strong></label>
                    <input type="text" class="form-control" :value="profile.data.email" disabled>
                </div>
                <div class="form-group">
                    <label><strong>Created at:</strong></label>
                    <input type="text" class="form-control" :value="profile.data.created_at" disabled>
                </div>
                <div class="form-group">
                    <label><strong>Updated at:</strong></label>
                    <input type="text" class="form-control" :value="profile.data.updated_at" disabled>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    middleware: ['auth'],
    head() {
        return {
            title: 'Profile',
            meta: []
        }
    },
    data() {
        profile: ''
    },
    async asyncData({$axios}) {
        let user = await $axios.$get('/user')
        return { profile: user }
    },
}
</script>

<style>
:root{--input-padding-x:1.5rem;--input-padding-y:.75rem}
body{background: #ffffff;}
</style>