<template>
  <section class="page-section py-5 md:py-10 mb-5">
    <div class="px-5 sm:px-10">
      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("UNIK.OWNER") }}
        </div>
        <div class="truncate">
          <LinkWallet :address="unik.ownerId" :trunc="false" />
        </div>
      </div>

      <div class="list-row-border-b">
        <div class="mr-4">
          {{ $t("UNIK.TYPE") }}
        </div>
        {{ $t(unik.type) }}
      </div>

      <div class="list-row-border-b-no-wrap">
        <div class="mr-4">
          {{ $t("UNIK.CREATION_DATE") }}
        </div>
        <div v-if="unik.creation">
          {{ readableTimestamp(unik.creation) }}
        </div>
        <div v-else>
          <i>{{ $t("Not yet available") }}</i>
        </div>
      </div>
    </div>

    <div class="px-5 sm:px-10">
      <div class="list-row">
        <div class="mr-4">
          {{ $t("UNIK.PROPERTIES") }}
        </div>
      </div>
      <div class="py-2">
        <UnikProperties v-if="unik.properties && unik.properties.length > 0" :properties="unik.properties" />
        <div class="text-center semibold" v-else>{{ $t('UNIK.NO_PROPERTIES') }}</div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import UnikProperties from "@/components/unik/UnikProperties.vue";

@Component({
  components: { UnikProperties },
})
export default class UnikDetails extends Vue {
  @Prop({ required: true, default: {} }) public unik: any;
}
</script>

<style scoped>
.list-row-border-b-no-wrap > div:last-child {
  text-align: right;
}
</style>
