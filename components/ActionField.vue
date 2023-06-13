<template>
  <div class="action-field">
    <el-input
      v-model="modelValue"
      class="action-field-input"
      :placeholder="placeholder"
      :type="type || 'text'"
    />
    <el-button
      type="primary"
      class="action-field-btn"
      :disabled="!isValid"
      @click="$emit('action')"
      @input="console.log(1)"
    >
      {{ label }}
    </el-button>
  </div>
</template>
<script>
export default {
  name: 'ActionField',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    type: {
      type: String,
      required: false,
      default: '',
    },
    label: {
      type: String,
      required: true,
      default: '',
    },
    placeholder: {
      type: String,
      required: true,
      default: '',
    },
    rule: {
      type: String,
      required: false,
      default: '',
    },
  },
  data: () => ({
    isValid: false,
    validators: {
      inn: /^\d{10,12}$/,
      email: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_-])+\.([A-Za-z]{2,4})$/,
    },
  }),
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(v) {
        this.isValid = this.validators[this.rule]
          ? v && this.validators[this.rule].test(v)
          : !!v
        this.$emit('input', v)
      },
    },
  },
}
</script>
<style lang="scss">
.action-field {
  display: flex;
  flex-direction: row;
  height: 56px;
  width: 100%;
  margin-bottom: 46px;
  margin-top: 32px;

  & > &-btn {
    border-radius: 0px 6px 6px 0px;
    font-weight: 600;
    width: 150px;
  }

  &-input {
    max-width: 600px;

    input {
      height: 56px;
      border-radius: 6px 0px 0px 6px;
      font-size: 24px;
    }
  }
}
</style>
