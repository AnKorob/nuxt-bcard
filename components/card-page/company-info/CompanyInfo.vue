<template>
  <div class="company-card">
    <div class="company-card-header">
      <h1 class="company-card-header__title">
        {{ clientCompany.short_name }}
      </h1>
      <ActionsBlock @open-email-block="$emit('open-email-block')" />
    </div>
    <CompanyInfoBlock card />
    <BankInfoBlock />
  </div>
</template>
<script>
import { mapState } from 'vuex'

import ActionsBlock from '@/components/card-page/company-info/ActionsBlock.vue'
import CompanyInfoBlock from '@/components/CompanyInfoBlock.vue'
import BankInfoBlock from '@/components/BankInfoBlock.vue'

export default {
  name: 'CompanyInfo',
  components: {
    ActionsBlock,
    CompanyInfoBlock,
    BankInfoBlock,
  },
  props: {
    value: { type: String, default: '' },
  },
  computed: {
    ...mapState(['clientCompany']),
  },
  updated: {},
}
</script>
<style lang="scss" scoped>
.company-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-bottom: 38px;

  &-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-weight: 300;
    margin-bottom: 32px;

    &__title {
      display: flex;
      font-size: 48px;
      font-weight: 400;
    }
  }
}
</style>
