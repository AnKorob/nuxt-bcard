<template>
  <div class="settings">
    <h3 class="settings-header">Настройки</h3>
    <div class="settings-sides">
      <div class="settings-sides-one">
        <div class="settings-sides-one-header">
          {{ clientCompany.short_name }}
        </div>
        <el-radio-group v-model="isCustomer" @change="reverseSides">
          <el-radio-button :label="true">Исполнитель</el-radio-button>
          <el-radio-button :label="false">Заказчик</el-radio-button>
        </el-radio-group>
      </div>
      <div class="settings-sides-one">
        <div class="settings-sides-one-header">Контрагент</div>
        <el-radio-group v-model="isCompany" @change="findAgent">
          <el-radio-button :label="true">Юр. лицо</el-radio-button>
          <el-radio-button :label="false">Физ. лицо</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="settings-form">
      <el-form v-if="isCompany" class="settings-form-entity">
        <el-form-item class="settings-form-field" label="ИНН">
          <el-autocomplete
            v-model="oppositeInn"
            v-mask="`############`"
            type="number"
            :fetch-suggestions="searchInn"
            :trigger-on-focus="false"
            placeholder="Пример: 7723615168"
            @select="onSelectInn"
          />
          <el-tag v-if="innTag" closable @close="onCloseInnTag">
            {{ innTag }}
          </el-tag>
        </el-form-item>
        <el-form-item class="settings-form-field" label="БИК">
          <el-autocomplete
            v-model="oppositeBik"
            v-mask="`#########`"
            type="number"
            :fetch-suggestions="searchBik"
            :trigger-on-focus="false"
            placeholder="Пример: 044525593"
            @select="onSelectBik"
          />
          <el-tag v-if="bikTag" closable @close="onCloseBikTag">
            {{ bikTag }}
          </el-tag>
        </el-form-item>
        <el-form-item class="settings-form-field" label="Р/с">
          <el-input
            v-model="oppositeBankAccount"
            v-mask="`####################`"
            placeholder="Пример: 40702810000000152259"
            type="number"
            @input="setOppositeAccount"
          />
        </el-form-item>
      </el-form>
      <el-form v-else class="settings - form - individual">
        <el-form-item class="settings-form-field" label="ФИО">
          <el-input
            v-model="passport.name"
            placeholder="Пример: Иванов Иван Иванович"
          />
        </el-form-item>
        <el-form-item class="settings-form-field" label="Серия и номер">
          <el-input
            v-model="passport.number"
            placeholder="Пример: 6666 000001"
            type="number"
          />
        </el-form-item>
        <el-form-item class="settings-form-field" label="Дата выдачи">
          <el-date-picker
            v-model="passport.date"
            type="date"
            format="dd.MM.yyyy"
            value-format="dd.MM.yyyy"
            placeholder="Выберите дату"
            :pickerOptions="{
              firstDayOfWeek: 1,
            }"
          />
        </el-form-item>
        <el-form-item class="settings-form-field" label="Кем выдан">
          <el-input
            v-model="passport.authority"
            placeholder="Пример: Отделом ОУФМС России по гор.Москве"
          />
        </el-form-item>
        <el-form-item class="settings-form-field" label="Код подразделения">
          <el-input
            v-model="passport.subdivision"
            v-mask="`###-###`"
            placeholder="Пример: 100-500"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="settings-comment">
      * Мы не сохраняем данные контрагентов. После перезагрузки страницы, данные
      о контрагентах обнулятся.
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'RequisitesSettings',
  components: {},
  data: () => ({
    isValid: false,
    number: '',
    isCompany: true,
    isCustomer: true,
    oppositeBik: '',
    oppositeInn: '',
    oppositeBankAccount: '',
    innTag: '',
    bikTag: '',
    passport: {
      name: '',
      number: '',
      authority: '',
      date: '',
      subdivision: '',
      type: 'PERSON',
    },
  }),
  computed: {
    ...mapState(['oppositeCompany', 'oppositeBank', 'clientCompany']),
  },
  watch: {
    passport: {
      handler: function (p) {
        this.$emit('update-passport', p)
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      getOppositeCompanyByInn: 'getOppositeCompanyByInn',
      getOppositeBankByBik: 'getOppositeBankByBik',
    }),
    ...mapMutations({
      setOppositeBankAccount: 'SET_OPPOSITE_BANK_ACCOUNT',
      setOppositeCompany: 'SET_OPPOSITE_COMPANY',
      clearOpposite: 'CLEAR_OPPOSITE_COMPANY',
      clearOppositeBank: 'CLEAR_OPPOSITE_BANK',
      setOppositeBank: 'SET_OPPOSITE_BANK',
    }),
    reverseSides() {
      this.$emit('reverse-sides', this.isCustomer)
    },
    findAgent() {
      this.$emit('find-agent', this.isCompany)
    },
    setOppositeAccount() {
      this.setOppositeBankAccount(this.oppositeBankAccount)
    },
    onSelectInn(company) {
      this.setOppositeCompany(company.data)
      this.innTag = company.value
    },
    searchInn(inn, cb) {
      if (!/^\d{10,12}$/.test(inn)) return cb()
      this.getOppositeCompanyByInn(inn).then((response) => {
        const result = [{ value: response.value, data: response }]
        cb(result)
      })
    },
    onCloseInnTag() {
      this.innTag = ''
      this.clearOpposite()
    },
    onSelectBik(company) {
      this.setOppositeBank(company.data)
      this.bikTag = company.value
    },
    searchBik(bik, cb) {
      if (!/^\d{9}$/.test(bik)) return cb()
      this.getOppositeBankByBik(bik).then((response) => {
        const result = [{ value: response.name.short, data: response }]
        cb(result)
      })
    },
    onCloseBikTag() {
      this.bikTag = ''
      this.clearOppositeBank()
    },
  },
}
</script>
<style lang="scss" scoped>
.settings {
  display: flex;
  flex-direction: column;
  width: 332px;
  padding-left: 32px;
  flex-shrink: 0;

  & > div {
    margin-top: 30px;
  }

  &-header {
    font-weight: 400;
  }

  &-sides {
    &-one {
      &-header {
        font-weight: 600;
        margin-bottom: 4px;
      }

      & + & {
        margin-top: 12px;
      }
    }
  }

  &-comment {
    text-align: left;
    font-weight: 300;
    border-top: 1px solid #e8e8e8;
    font-size: 0.875em;
    color: #666;
    padding-top: 24px;
  }
}

.settings::v-deep {
  .el-radio-group {
    width: 100%;
    & > .el-radio-button {
      width: 50%;

      & > .el-radio-button__inner {
        width: 100%;
      }
    }
  }

  .el-form-item {
    margin-bottom: 0;

    &__label {
      font-weight: 600;
      line-height: 30px;
    }
  }

  .el-input,
  .el-autocomplete,
  .el-tag {
    width: 100%;
  }

  .el-tag {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
  }
}
</style>
