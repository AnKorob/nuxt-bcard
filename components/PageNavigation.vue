<template>
  <div
    :class="[
      'page-header-nav',
      {
        'page-header-nav-one': !$route.params.hash,
      },
    ]"
  >
    <nuxt-link
      v-if="$route.params.hash"
      class="page-header-nav-link"
      :to="{ path: '/bcard' }"
    >
      Сгенерировать новую карточку
    </nuxt-link>

    <el-select
      v-if="companiesTabs.length"
      v-model="selectedCompany"
      filterable
      placeholder="Select"
    >
      <el-option
        v-for="tab in companiesTabs"
        :key="tab.hash"
        :label="tab.title"
        :value="tab.hash"
        @click.native="changeRoute(tab.hash)"
      >
        {{ tab.title }}
      </el-option>
    </el-select>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'PageNavigation',
  data() {
    return { selectedCompany: '' }
  },
  computed: {
    ...mapState(['companiesTabs']),
  },
  watch: {
    companiesTabs() {
      this.selectedCompany = this.$route.params.hash
    },
    '$route.params': {
      handler: function () {
        if (!this.$route.params?.hash) this.selectedCompany = null
      },
      deep: true,
    },
  },
  mounted() {
    this.setCompanyTabs()
  },
  methods: {
    ...mapMutations({
      setCompanyTabs: 'SET_COMPANY_TABS',
    }),

    changeRoute(hash) {
      this.$router.push(`/bcard/${hash}`)
      this.selectedCompany = hash
    },
  },
}
</script>
<style lang="scss">
.page-header-nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 32px;
  width: 1110px;
  min-height: 34px;

  color: #959595;

  &-one {
    display: flex;
    justify-content: flex-end;
  }

  & > .el-tabs {
    display: flex;

    justify-content: flex-end;
    width: 100%;

    & > .el-tab-pane {
      flex-wrap: wrap;
    }
  }

  &-link {
    text-decoration: none;
    color: #959595;
    cursor: pointer;
    display: flex;
    flex: 1 0;
    width: 100%;
    height: 100%;
    min-width: 250px;

    &:hover {
      color: #000;
      cursor: pointer;
    }
  }
}
</style>
