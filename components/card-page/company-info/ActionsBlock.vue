<template>
  <div class="action">
    <el-button
      v-for="button in buttons"
      :key="button.label"
      class="action-btn"
      plain
      @click="button.onClickMethod"
    >
      {{ button.label }}
    </el-button>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'ActionsBlock',
  data() {
    return {
      buttons: [
        { label: 'PDF', onClickMethod: this.downloadPdf },
        { label: 'DOCX', onClickMethod: this.downloadWord },
        {
          label: 'Отправить на Email',
          onClickMethod: this.sendEmail,
        },
        {
          label: 'Получить ссылку',
          onClickMethod: this.flashMessage,
        },
      ],
    }
  },
  computed: {
    currentLink() {
      return window.location.href
    },
  },
  methods: {
    ...mapActions(['getPdf', 'getWord']),
    sendEmail() {
      this.$emit('open-email-block')
    },
    downloadPdf() {
      this.getPdf(this.$route.params.hash)
    },
    downloadWord() {
      this.getWord(this.$route.params.hash)
    },
    flashMessage() {
      this.$flashMessage(this.currentLink)
    },
  },
}
</script>
<style lang="scss">
.action {
  display: flex;
  flex: 1;
  justify-content: flex-end;

  & > &-btn {
    display: flex;
    align-items: center;
    height: 32px;
    &:first-of-type {
      margin-left: 10px;
    }
  }
}
</style>
