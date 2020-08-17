<template>
  <div>
    <Loader :data="transactions">
      <div v-for="transaction in transactions" :key="transaction.id" class="row-mobile">
        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("COMMON.ID") }}
          </div>
          <LinkTransaction :id="transaction.id" />
        </div>

        <div class="list-row-border-b-no-wrap">
          <div class="mr-4">
            {{ $t("COMMON.TIMESTAMP") }}
          </div>
          <div v-if="transaction.timestamp" class="text-right">
            {{ readableTimestamp(transaction.timestamp.unix) }}
          </div>
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("TRANSACTION.SENDER") }}
          </div>
          <LinkWallet :key="transaction.sender" :address="transaction.sender" />
        </div>

        <div class="list-row-border-b">
          <div class="mr-4">
            {{ $t("TRANSACTION.RECIPIENT") }}
          </div>
          <LinkWallet
            :key="transaction.recipient"
            :address="transaction.recipient"
            :type="transaction.type"
            :asset="transaction.asset"
            :type-group="transaction.typeGroup"
            :show-timelock-icon="true"
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
            <TransactionAmount :transaction="transaction" tooltip-placement="left" />
          </div>
        </div>

        <div class="list-row">
          <div class="mr-4">
            {{ $t("TRANSACTION.FEE") }}
          </div>
          <div>
            <TransactionAmount :transaction="transaction" :is-fee="true" tooltip-placement="left" />
          </div>
        </div>

        <div v-if="showConfirmations" class="list-row">
          <div class="mr-4">
            {{ $t("COMMON.CONFIRMATIONS") }}
          </div>
          <div class="flex items-center justify-end">
            <div
              v-if="transaction.confirmations <= activeDelegates"
              class="flex items-center justify-end whitespace-no-wrap text-green"
            >
              <span class="inline-block mr-2">{{ readableNumber(transaction.confirmations) }}</span>
              <SvgIcon class="flex-none icon" name="became-active" view-box="0 0 16 16" />
            </div>
            <div
              v-else
              v-tooltip="{
                content: readableNumber(transaction.confirmations) + ' ' + $t('COMMON.CONFIRMATIONS'),
                trigger: 'hover click',
                placement: 'left',
              }"
            >
              {{ $t("TRANSACTION.WELL_CONFIRMED") }}
            </div>
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
export default class TableTransactionsMobile extends Vue {
  @Prop({
    required: true,
    validator: (value) => {
      return Array.isArray(value) || value === null;
    },
  })
  public transactions: ITransaction[] | null;
  @Prop({ required: false, default: false }) public showConfirmations: boolean;

  private activeDelegates: IDelegate[];
  private smartbridgeFilter: string;
}
</script>

<style scoped>
.row-mobile:nth-child(even) {
  background-color: var(--color-theme-table-row);
}
</style>
