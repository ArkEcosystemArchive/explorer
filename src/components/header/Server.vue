<template>
  <div class="w-full flex items-center px-5 sm:px-10">
    <button @click="$store.dispatch('ui/setHeaderType', null)">
      <img src="@/assets/images/icons/cross.svg" />
    </button>
    <input
        type="text"
        v-model="newServerURL"
        :placeholder="currentServerURL"
        class="search-input w-full flex-auto mr-2 py-4 pl-4 bg-transparent"/>
    <button @click="resetServer" class="semibold text-red px-2 py-4 hidden items-center border-b-2 margin-t-2 border-transparent button-block">RESET</button>
    <button @click="setServer" class="semibold px-2 py-4 hidden items-center border-b-2 margin-t-2 border-transparent button-block">SAVE</button>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("network", {
      currentServerURL: "server"
    })
  },

  data: () => ({
    newServerURL: null
  }),

  methods: {
    setServer() {
      if (this.newServerURL != "" && this.newServerURL != undefined)
        this.$store.dispatch("network/setServer", this.newServerURL);
      this.$store.dispatch("ui/setHeaderType", null);
    },

    resetServer() {
      this.$store.dispatch(
        "network/setServer",
        localStorage.getItem("originalServer")
      );
      this.$store.dispatch("ui/setHeaderType", null);
    }
  }
};
</script>

<style>
.button-block {
  display: block;
}
</style>
