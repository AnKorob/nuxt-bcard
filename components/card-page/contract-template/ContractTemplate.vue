<template>
  <div class="order">
    <div class="order-pattern">
      <div class="order-pattern-header">
        <h3 class="order-pattern-header__title">Шаблон шапки договора</h3>
        <el-button
          type="primary"
          class="order-pattern-header__copy"
          @click="$copy(templateForCopy)"
          >Копировать</el-button
        >
      </div>
      <div class="order-pattern-template">
        <span v-html="templateForRender"></span>
      </div>
      <div class="order-pattern-header">
        <h3 class="order-pattern-header__title">Реквизиты</h3>
        <el-button
          type="primary"
          class="order-pattern-header__copy"
          @click="$copy('')"
        >
          Копировать
        </el-button>
      </div>
      <div
        class="order-pattern-block-card"
        :class="{ 'order-pattern-block-card--reverse': isCustomer }"
      >
        <SignatureBlock :side="clientCompany" :side-bank="clientBank" />
        <SignatureBlock
          :side="oppositeCompany"
          :side-bank="oppositeBank"
          :passport="isCompany ? null : passport"
        />
      </div>
    </div>
    <RequisitesSettings
      @reverse-sides="(e) => (isCustomer = e)"
      @find-agent="(e) => (isCompany = e)"
      @update-passport="(e) => (passport = e)"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import RequisitesSettings from './RequisitesSettings.vue'
import generateTemplate from '@/plugins/generateTemplate'

import SignatureBlock from '@/components/card-page/contract-template/SignatureBlock.vue'

export default {
  name: 'ContractTemplate',
  components: {
    RequisitesSettings,
    SignatureBlock,
  },
  props: {
    value: { type: String, default: '' },
  },
  data: () => ({
    isCustomer: true,
    isCompany: true,
    passport: {
      type: 'PERSON',
    },
  }),

  computed: {
    ...mapState([
      'clientCompany',
      'oppositeCompany',
      'oppositeBank',
      'clientBank',
    ]),
    templateForRender() {
      return generateTemplate(
        this.clientCompany,
        this.isCompany ? this.oppositeCompany : this.passport,
        this.isCustomer,
        true // colored
      )
    },
    templateForCopy() {
      return generateTemplate(
        this.clientCompany,
        this.isCompany ? this.oppositeCompany : this.passport,
        this.isCustomer
      )
    },
  },
}
</script>
<style lang="scss">
.order {
  height: 800px;
  display: flex;
  flex-direction: row;
  &-pattern {
    display: flex;
    flex-direction: column;

    &-header {
      display: flex;
      width: 100%;
      flex-direction: row;
      margin-bottom: 24px;
      justify-content: space-between;

      &__title {
        font-weight: 300;
        font-size: 24px;
      }

      & > &__copy {
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    &-template {
      display: flex;
      font-weight: 300;
      font-size: 15px;
      margin-bottom: 48px;
      text-align: justify;
    }
    &-block {
      display: flex;
      flex-direction: column;

      &-header {
        display: flex;
        flex-direction: row;
        margin-bottom: 24px;
        justify-content: space-between;
      }
      &-card {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 20px;
        & > .signature-block {
          flex: 1;
        }

        &--reverse {
          flex-direction: row-reverse;
        }
      }
    }
  }
}
</style>
