<template>
  <div
    v-loading="isLoading"
    class="card-generator"
    element-loading-text="Загрузка данных..."
    element-loading-background="rgb(247 248 249 / 80%)"
  >
    <h3 class="card-generator-title">Введите ИНН организации</h3>
    <ActionField
      v-model="companyInn"
      type="number"
      label="Найти"
      rule="inn"
      placeholder="Пример: 7723615168"
      @action="getCompanyByINN"
    />
    <div
      v-if="!isNewClient && getClientCompanyTableRows.length"
      class="card-generator-info"
    >
      <CompanyInfoBlock />
      <el-button
        type="primary"
        class="card-generator-info-action"
        @click="createCard"
      >
        Все верно, создать карточку
      </el-button>
    </div>
    <div v-else class="card - generator - hint">
      <p>Мы найдем реквизиты организациий и ИП в ЕГРЮЛ или ЕГРИП.</p>
      <p>В ИНН организации 10 цифр или 12 цифр для ИП.</p>
      <p>ИНН можно найти в свидетельстве о регистрации организации</p>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'

import CompanyInfoBlock from '@/components/CompanyInfoBlock.vue'
import ActionField from '@/components/ActionField.vue'

export default {
  name: 'CardGenerator',
  components: { CompanyInfoBlock, ActionField },
  data: () => ({
    companyInn: '',
    isLoading: false,
    isNewClient: true,
  }),

  computed: {
    ...mapState(['clientCompany']),
    ...mapGetters(['getClientCompanyTableRows']),
  },

  methods: {
    ...mapActions({
      getCompanyByInn: 'getCompanyByInn',
    }),
    ...mapMutations({
      setCompanyTab: 'SET_COMPANY_TAB',
    }),
    createCard() {
      this.setCompanyTab({
        title: this.clientCompany.short_name,
        hash: this.clientCompany.hash,
      })
      this.$router.push(`/bcard/${this.clientCompany.hash}`)
    },
    getCompanyByINN() {
      this.isLoading = true
      this.getCompanyByInn(this.companyInn)
        .then(() => {
          this.companyInnComputed = ''
        })
        .catch(() => {
          this.$message({
            message: 'Компания с таким ИНН не найдена',
            type: 'error',
          })
        })
        .finally(() => {
          this.isLoading = false
          this.isNewClient = false
        })
    },
  },
}
</script>
<style lang="scss" scoped>
.card-generator {
  height: 100%;
  width: 100%;
  font-size: 16px;

  &-title {
    font-size: 44px;
    font-weight: 300;
  }

  &-hint {
    color: #a9a9a9;

    & > p:first-child {
      margin-bottom: 20px;
    }
  }

  &-info {
    & > &-action {
      margin: 30px 0;
      justify-content: flex-start;
      width: 300px;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
