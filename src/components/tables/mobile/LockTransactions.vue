<template>
  <div>
    <Loader :data="transactions">
      <div v-for="transaction in transactions" :key="transaction.lockId" class="row-mobile">
        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("COMMON.ID") }}
          </div>
          <LinkTransaction :id="transaction.lockId" />
        </div>

        <div class="list-row-border-b-no-wrap">
          <div class="mr-4">
            {{ $t("COMMON.EXPIRATION") }}
          </div>
          <div v-if="transaction.expirationType === 1" class="text-right">
            {{ readableTimestampFromEpoch(transaction.expirationValue) }}
          </div>
          <div v-if="transaction.expirationType === 2" class="text-right">
            <div
              v-tooltip="{
                trigger: 'hover click',
                content: readableTimestampFromBlockheight(transaction.expirationValue),
                placement: 'top',
              }"
            >
              {{ data.row.expirationValue }}
            </div>
          </div>
          <div v-if="transaction.timestamp" class="text-right">
            {{ readableTimestamp(transaction.timestamp.unix) }}
          </div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("TRANSACTION.RECIPIENT") }}
          </div>
          <LinkWallet
            :key="transaction.recipientId"
            :address="transaction.recipientId"
            :type="transaction.type"
            :asset="transaction.asset"
            :type-group="transaction.typeGroup"
          />
        </div>

        <div
          v-if="smartbridgeFilter !== 'hidden' && truncate(transaction.vendorField || '')"
          class="list-row-border-b-no-wrap"
        >
          <div class="mr-4">
            {{ $t("TRANSACTION.SMARTBRIDGE") }}
          </div>
          <div class="text-right truncate">
            {{ transaction.vendorField }}
          </div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("TRANSACTION.AMOUNT") }}
          </div>
          <div>
            <TransactionAmount :transaction="transaction" />
          </div>
        </div>
      </div>
      <div v-if="transactions && !transactions.length" class="px-5 md:px-10">
        <span>{{ $t("COMMON.NO_RESULTS") }}</span>
      </div>
    </Loader>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ITransaction, IDelegate } from "@/interfaces";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters("network", ["activeDelegates"]),
    ...mapGetters("ui", ["smartbridgeFilter"]),
  },
})
export default class TableLockTransactionsMobile extends Vue {
  @Prop({
    required: true,
    validator: (value) => {
      return Array.isArray(value) || value === null;
    },
  })
  public transactions: ITransaction[] | null;

  private activeDelegates: IDelegate[];
  private smartbridgeFilter: string;
}
</script>

<style scoped>
.row-mobile:nth-child(even) {
  background-color: var(--color-theme-table-row);
}
</style>
