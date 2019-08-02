<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t('PAGES.NOT_FOUND.TITLE') }}</ContentHeader>

    <section class="page-section py-5 md:py-10 px-6">
      <div class="my-10 text-center">
        <img
          v-if="!nightMode"
          class="mx-auto"
          src="@/assets/images/404/light.png"
        >
        <img
          v-else
          class="mx-auto"
          src="@/assets/images/404/dark.png"
        >
        <h1 class="text-3xl">
          {{ $t('PAGES.NOT_FOUND.TITLE') }}
        </h1>
        <p>{{ $t('PAGES.NOT_FOUND.PAGE') }}</p>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('ui', ['nightMode'])
  }
}
</script>
