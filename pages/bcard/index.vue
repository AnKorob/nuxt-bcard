<template>
  <div class="generator-page">
    <Transition name="generator-page">
      <component :is="component" @toggle="showIntro = !showIntro" />
    </Transition>
  </div>
</template>
<script>
import CardGenerator from '@/components/generator-page/CardGenerator.vue'
import CardIntro from '@/components/generator-page/CardIntro.vue'

export default {
  name: 'GeneratorPage',
  components: {
    CardGenerator,
    CardIntro,
  },
  layout: 'default',
  data: () => ({
    showIntro: true,
  }),
  head() {
    return {
      title: 'Онлайн карточка для организации и ИП | itillect.ru',
    }
  },
  computed: {
    component() {
      return this.showIntro ? CardIntro : CardGenerator
    },
  },
}
</script>
<style lang="scss" scoped>
.generator-page {
  width: 100%;
  margin-top: 48px;

  &-leave {
    transform: translateX(100%);
    &-to {
      transform: translateX(-100%);
      opacity: 0;
    }
    &-active {
      position: absolute;
      transition: all 0.3s ease-out;
    }
  }

  &-enter {
    transform: translateX(100%);
    &-active {
      position: absolute;
      transition: all 0.3s ease-in;
    }
  }
}
</style>
