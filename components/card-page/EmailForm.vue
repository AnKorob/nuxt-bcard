<template>
  <div class="email-form">
    <div class="email-form-header">
      <h1 class="email-form-header__title">Введите Email получателя</h1>
      <el-button class="email-form-header__btn" plain @click="closeEmail">
        Отмена
      </el-button>
    </div>
    <ActionField
      v-model="email"
      placeholder="Пример: business@itillect.com"
      rule="email"
      label="Отправить"
      @action="sendEmail"
    />
    <p>
      На указанный Email мы отправим письмо с приложенной карточкой в формате
      PDF
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import ActionField from '@/components/ActionField.vue'

export default {
  name: 'EmailForm',
  components: { ActionField },
  data: () => ({
    email: '',
  }),
  methods: {
    ...mapActions({
      sendMail: 'sendMail',
    }),
    closeEmail() {
      this.$emit('close')
    },
    sendEmail() {

      }
    },
  },
}
</script>
<style lang="scss">
.email-form {
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

    & > &__btn {
      display: flex;
      align-items: center;
      height: 32px;
    }
  }
}
</style>
