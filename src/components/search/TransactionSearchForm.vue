<template>
  <div>
    <div class="flex flex-wrap justify-between my-4">
      <div class="w-full md:w-40 mb-4 md:mb-0">
        <InputText
          v-model="form.type"
          :label="$t('ADVANCED_SEARCH.TRANSACTION.TRANSACTION_TYPE')"
          name="transaction-type"
          errors=""
        />
      </div>

      <div class="flex w-full md:w-64 mb-4 md:mb-0">
        <div class="w-1/2">
          <InputDate
            class="mr-3"
            v-model="form.date.from"
            :label="$t('ADVANCED_SEARCH.TRANSACTION.DATE_FROM')"
            name="date-from"
            errors=""
          />
        </div>
        <div class="w-1/2">
          <InputDate
            v-model="form.date.to"
            :label="$t('ADVANCED_SEARCH.TRANSACTION.DATE_TO')"
            name="date-to"
            errors=""
            value="01-01-2010"
          />
        </div>
      </div>

      <div class="flex w-full md:w-64 mb-4 md:mb-0">
        <div class="w-1/2">
          <InputNumber
            class="mr-3"
            v-model="form.amount.from"
            :label="$t('ADVANCED_SEARCH.TRANSACTION.AMOUNT_FROM')"
            name="amount-from"
            errors=""
            min="0"
          />
        </div>

        <div class="w-1/2">
          <InputNumber
            v-model="form.amount.to"
            :label="$t('ADVANCED_SEARCH.TRANSACTION.AMOUNT_TO')"
            name="amount-to"
            errors=""
          />
        </div>
      </div>

      <div class="flex w-full md:w-64 mb-4 md:mb-0">
        <div class="w-1/2">
          <InputNumber
            v-model="form.fee.from"
            :label="$t('ADVANCED_SEARCH.TRANSACTION.FEE_FROM')"
            name="fee-from"
            errors=""
          />
        </div>
        <div class="w-1/2">
          <InputNumber
            v-model="form.fee.to"
            :label="$t('ADVANCED_SEARCH.TRANSACTION.FEE_TO')"
            name="fee-to"
            errors=""
          />
        </div>
      </div>
    </div>

    <InputText v-model="form.vendorField" :label="$t('TRANSACTION.SMARTBRIDGE')" name="" errors="" class="pt-0" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { InputText, InputNumber, InputDate } from "./input";

@Component({
  components: {
    InputText,
    InputNumber,
    InputDate,
  },
})
export default class TransactionSearchForm extends Vue {
  @Prop({ required: true }) private form: object;
}
</script>
