<template>
  <div class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("PAGES.NOT_FOUND.TITLE") }}</ContentHeader>

    <section class="px-6 py-5 page-section md:py-10">
      <div class="my-10 text-center">
        <img v-if="!nightMode" class="mx-auto" src="@/assets/images/404/light.png" />
        <img v-else class="mx-auto" src="@/assets/images/404/dark.png" />
        <h1 class="text-3xl">
          {{ $t("PAGES.NOT_FOUND.TITLE") }}
        </h1>
        <p>{{ $t("PAGES.NOT_FOUND.PAGE") }}</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters("ui", ["nightMode"]),
  },
})
export default class ErrorPage extends Vue {
  private nightMode: boolean;
}
</script>
