<template>
  <div>
    <Navbar />
    <Nuxt />
    <textFooter />
  </div>
</template>

<script>
import Navbar from '@/components/DefaultHeader'
import textFooter from '@/components/DefaultFooter'
export default {
  components: {
    Navbar,
    textFooter
  }
}
</script>