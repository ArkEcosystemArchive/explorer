<template>
  <div class="max-w-2xl mx-auto md:pt-5 text-center">
    <content-header>Ooops!</content-header>

    <section class="bg-theme-content-background shadow-theme xl:rounded-lg py-10 px-6">
      <div class="my-10">
        <img
          v-if="!nightMode"
          src="@/assets/images/404/light.png" />
        <img
          v-else
          src="@/assets/images/404/dark.png" />
        <h1>Ooops!</h1>
        <p>Sorry, page not found</p>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('ui', ['nightMode']),
  },
}
</script>
