<template>
  <div :class="['info-block', card && 'info-block-card']">
    <template v-for="field in getClientCompanyTableRows">
      <el-row
        v-if="field.value && field.label"
        :key="field.key"
        class="info-block-row"
      >
        <el-col :span="6" class="info-block-row__option">
          {{ field.label }}
        </el-col>
        <el-col :span="15" class="info-block-row__value">
          {{ field.value }}
        </el-col>
        <el-col v-if="card" :span="3" class="info-block-row__copy">
          <el-button
            type="primary"
            class="info-block-row__copy-btn"
            @click="$copy(field.value)"
          >
            Копировать
          </el-button>
        </el-col>
      </el-row>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "InfoBlock",
  props: {
    card: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["getClientCompanyTableRows"]),
  },
};
</script>
