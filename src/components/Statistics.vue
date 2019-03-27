<template>
  <loader :data="stats">
    <div class="px-5 sm:px-10 pt-8 flex flex-wrap flex-col sm:flex-row">
      <div class="mr-4 mb-4 flex flex-row justify-between sm:flex-col">
        <div class="text-grey mb-1">
          {{ $t("Day") }}
        </div>
        <div class="sm:text-xl semibold">
          {{ stats.day.toLocaleString() }}
        </div>
      </div>
      <span class="border-r mx-4 lg:mx-6 mb-4" />
      <div class="mr-4 mb-4 flex flex-row justify-between sm:flex-col">
        <div class="text-grey mb-1">
          {{ $t("Week") }}
        </div>
        <div class="sm:text-xl semibold">
          {{ stats.week.toLocaleString() }}
        </div>
      </div>
      <span class="border-r mx-4 lg:mx-6 mb-4" />
      <div class="mr-4 mb-4 flex flex-row justify-between sm:flex-col">
        <div class="text-grey mb-1">
          {{ $t("Month") }}
        </div>
        <div class="sm:text-xl semibold">
          {{ stats.month.toLocaleString() }}
        </div>
      </div>
      <span class="border-r mx-4 lg:mx-6 mb-4" />
      <div class="mr-4 mb-4 flex flex-row justify-between sm:flex-col">
        <div class="text-grey mb-1">
          {{ $t("Year") }}
        </div>
        <div class="sm:text-xl semibold">
          {{ stats.year.toLocaleString() }}
        </div>
      </div>
      <span class="border-r mx-4 lg:mx-6 mb-4" />
      <div class="mr-4 mb-4 flex flex-row justify-between sm:flex-col">
        <div class="text-grey mb-1">
          {{ $t("All time") }}
        </div>
        <div class="sm:text-xl semibold">
          {{ stats.alltime.toLocaleString() }}
        </div>
      </div>
    </div>
  </loader>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    stats: {
      type: Object,
      required: true
    }
  }
}
</script>
