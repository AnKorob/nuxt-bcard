<template>
  <div class="info-block info-block-card">
    <h3 class="info-block-header">Банковские реквизиты</h3>
    <el-row
      v-for="field in getClientBankRows"
      :key="field.key"
      class="info-block-row"
    >
      <el-col :span="6" class="info-block-row__option">
        {{ field.label }}
      </el-col>
      <el-col v-if="field.input" :span="15" class="info-block-row__value">
        <el-input
          v-model="bankInfo[field.key]"
          :placeholder="field.input.placeholder"
          type="number"
          @input="onInput(field.key)"
        />
      </el-col>
      <el-col
        v-else
        :span="15"
        :class="[
          'info-block-row__value',
          !field.value && 'info-block-row__value-empty',
        ]"
      >
        {{ field.value ? field.value : 'Заполняется автоматически' }}
      </el-col>
      <el-col :span="3" class="info-block-row__copy">
        <el-button
          v-if="field.value || bankInfo[field.key]"
          type="primary"
          class="info-block-row__copy-btn"
          @click="$copy(field.value || bankInfo[field.key])"
        >
          Копировать
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'BankInfoBlock',
  data() {
    return {
      bankInfo: {
        account: '',
        bik: '',
      },
    }
  },
  computed: {
    ...mapGetters(['getClientBankRows']),
  },
  methods: {
    ...mapActions({
      getBankByBik: 'getBankByBik',
    }),
    ...mapMutations({
      setClientAccount: 'SET_CLIENT_BANK_ACCOUNT',
    }),
    onInput(key) {
      switch (key) {
        case 'account':
          if (/^\d{20}$/.test(this.bankInfo.account))
            this.setClientAccount(this.bankInfo.account)
          break
        case 'bik':
          if (/^\d{9}$/.test(this.bankInfo.bik))
            this.getBankByBik(this.bankInfo.bik)
          break
        default:
          break
      }
    },
  },
}
</script>
