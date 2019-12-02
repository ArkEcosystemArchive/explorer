<template>
  <div v-if="unik" class="max-w-2xl mx-auto md:pt-5">
    <ContentHeader>{{ $t("UNIK.SUMMARY") }}</ContentHeader>

    <template v-if="unikNotFound">
      <section class="page-section py-5 md:py-10 px-6">
        <div class="my-10 text-center">
          <NotFound :data-id="unik.id" data-type="UNIK token" />

          <button :disabled="isFetching" class="mt-4 pager-button items-center" @click="fetchUnik">
            <span>{{ !isFetching ? $t("Reload this page") : $t("Loading...") }}</span>
          </button>
        </div>
      </section>
    </template>

    <template v-else>
      <section class="mb-5">
        <div class="px-5 sm:px-10 py-8 bg-theme-feature-background flex xl:rounded-lg items-center">
          <div class="mr-6 flex-none">
            <SvgIcon class="icon" name="unik" view-box="0 0 64 64" />
          </div>
          <div class="flex-auto min-w-0">
            <div class="text-grey mb-2">
              {{ $t("UNIK.ID") }}
            </div>
            <div class="flex">
              <div class="text-xl text-white semibold truncate">
                <span class="mr-2">{{ unik.id }}</span>
              </div>
              <Clipboard v-if="unik.id" :value="unik.id" />
            </div>
          </div>
        </div>
      </section>

      <UnikDetails :unik="unik" />
    </template>
  </div>
</template>

<script lang="ts">
/* tslint:disable:no-console */
import { Vue, Prop, Component } from "vue-property-decorator";
import NotFound from "@/components/utils/NotFound.vue";
import UnikDetails from "@/components/unik/Details.vue";
import UnikService from "@/services/unik";
import { IUnik } from "../interfaces";

Component.registerHooks(["beforeRouteEnter", "beforeRouteUpdate"]);

@Component({
  components: {
    NotFound,
    UnikDetails,
  },
})
export default class Unik extends Vue {
  private unik: IUnik | null = null;
  private unikNotFound: boolean = false;
  private isFetching: boolean = false;

  public async beforeRouteEnter(to, from, next) {
    try {
      const unik: IUnik = await UnikService.find(to.params.id);
      next(vm => {
        vm.setUnik(unik);
      });
    } catch (e) {
      next(vm => {
        console.log(e.message || e.data.error);
        vm.unikNotFound = true;
        vm.unik = { id: to.params.id };
      });
    }
  }

  public async beforeRouteUpdate(to, from, next) {
    try {
      const unik: IUnik = await UnikService.find(to.params.id);
      this.setUnik(unik);
      next();
    } catch (e) {
      console.log(e.message || e.data.error);

      this.unikNotFound = true;
      this.unik = { id: to.params.id };
    }
  }

  private setUnik(unik) {
    this.unik = unik;
  }

  private async fetchUnik() {
    this.isFetching = true;

    try {
      const unik = await UnikService.find(this.unik.id);
      this.setUnik(unik);
      this.unikNotFound = false;
    } catch (e) {
      console.log(e.message || e.data.error);
    } finally {
      this.isFetching = false;
    }
  }
}
</script>
