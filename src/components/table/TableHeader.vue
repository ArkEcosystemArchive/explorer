<template>
  <thead>
    <tr class="text-xs text-theme-text-thead">
      <th
        v-for="field in fields" :key="field.label"
        @click="handler(field.sortBy)"
        :class="field.class"
        :field="sortKey"
        :direction="sortDirection">
        <span :class="field.spanClass">
          <img :src="sortSymbol" height="12" v-if="field.sortBy && sortKey === field.sortBy" />
          {{ field.label }}
        </span>
      </th>
    </tr>
  </thead>
</template>

<script>
  export default {
    props: ['fields', 'sortKey', 'sortDirection', 'sortSymbol', 'handler']
  }
</script>
