<template>
  <div class="signature-block">
    <template v-if="passport">
      <div class="signature-block-header">
        {{ passport.name || 'Иванов Иван Иванович' }}
      </div>
      <div class="signature-block-item">
        <div class="signature-block-row">
          <span class="signature-block-row__field"> Паспорт: </span>
          <span class="signature-block-row__value">
            {{ passport.number || '6666 000001' }}
          </span>
        </div>
      </div>
      <div class="signature-block-item">
        <div class="signature-block-row">
          <span class="signature-block-row__field"> Выдан: </span>
          <span class="signature-block-row__value">
            {{ passport.authority || 'отделом ОУФМС России по г.Москва' }}
          </span>
        </div>
        <div class="signature-block-row">
          <span class="signature-block-row__field"> Дата выдачи: </span>
          <span class="signature-block-row__value">
            {{ passport.date || '10.11.2012' }}
          </span>
        </div>
        <div class="signature-block-row">
          <span class="signature-block-row__field"> Код подразделения: </span>
          <span class="signature-block-row__value">
            {{ passport.subdivision || '100-500' }}
          </span>
        </div>
      </div>

      <div class="signature-block-item">
        <div class="signature-block-row">
          <span class="signature-block-row__field"> Частное лицо </span>
        </div>
        <div class="signature-block-row">
          <span class="signature-block-hand">
            {{ signName }}
          </span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="signature-block-header">
        {{ side.short_name }}
      </div>
      <div class="signature-block-item">
        <div class="signature-block-row">
          <span class="signature-block-row__field"> Адрес: </span>
          <span class="signature-block-row__value">
            {{ side.address || '–' }}
          </span>
        </div>
      </div>
      <div class="signature-block-item">
        <div class="signature-block-row">
          <span class="signature-block-row__field"> ИНН: </span>
          <span class="signature-block-row__value">
            {{ side.inn || '–' }}
          </span>
        </div>
        <div v-if="side.type === 'LEGAL'" class="signature-block-row">
          <span class="signature-block-row__field"> КПП: </span>
          <span class="signature-block-row__value">
            {{ side.kpp || '–' }}
          </span>
        </div>
        <div class="signature-block-row">
          <span class="signature-block-row__field"> ОГРН: </span>
          <span class="signature-block-row__value">
            {{ side.ogrn || '–' }}
          </span>
        </div>
      </div>
      <div class="signature-block-item">
        <div class="signature-block-row">
          <span class="signature-block-row__field"> Р/с: </span>
          <span class="signature-block-row__value">
            {{ sideBank.account || '–' }} в {{ sideBank.name || '–' }}
          </span>
        </div>
        <div class="signature-block-row">
          <span class="signature-block-row__field"> К/с: </span>
          <span class="signature-block-row__value">
            {{ sideBank.correspondent_account || '–' }}
          </span>
        </div>
        <div class="signature-block-row">
          <span class="signature-block-row__field"> Бик: </span>
          <span class="signature-block-row__value">
            {{ sideBank.bik || '–' }}
          </span>
        </div>
      </div>
      <div class="signature-block-item">
        <div v-if="side.type === 'LEGAL'" class="signature-block-row">
          <span class="signature-block-row__field">
            {{ side.manager || '–' }}
          </span>
        </div>
        <div class="signature-block-row">
          <span class="signature-block-row__value">
            {{ side.short_name || '–' }}
          </span>
        </div>
        <div class="signature-block-row">
          <span class="signature-block-hand">
            {{ signName }}
          </span>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'SignatureBlock',
  props: {
    side: {
      type: Object,
      required: true,
    },
    sideBank: {
      type: Object,
      required: true,
    },
    passport: {
      type: [Object, null],
      default: null,
    },
  },
  computed: {
    signName() {
      const name =
        (this.passport ? this.passport.name : this.side.ceo) ||
        'Иванов Иван Иванович'
      return name
        .split(/\s+/)
        .map((w, i) => (i ? w.substring(0, 1).toUpperCase() + '.' : w))
        .join(' ')
    },
  },
}
</script>
<style lang="scss" scoped>
.signature-block {
  font-size: 15px;
  font-weight: 300;
  position: relative;
  height: 350px;

  &-header {
    font-weight: 700;
    margin-bottom: 20px;
  }

  &-hand {
    min-height: 48px;
    border-bottom: 1px solid #000;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  &-item {
    margin-top: 16px;

    &:last-child {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }

  &-row {
    &__field {
      font-weight: 500;
    }
  }
}
</style>
