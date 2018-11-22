<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <content-header>{{ $t("Ooops!") }}</content-header>

    <section class="page-section py-5 md:py-10 px-6">
      <div class="my-10 text-center">
        <img
          v-if="!nightMode"
          src="@/assets/images/404/light.png" />
        <img
          v-else
          src="@/assets/images/404/dark.png" />
        <h1>{{ $t("Ooops!") }}!</h1>
        <p>{{ $t("Sorry, page not found") }}</p>
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
