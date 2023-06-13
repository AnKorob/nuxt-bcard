<template>
  <div class="card-intro">
    <div class="card-intro-block">
      <h1>
        Удобная<br />
        онлайн карточка <br />
        вашей организации
      </h1>
      <p>Сгенерируйте карточку вашей организации.</p>
      <p>
        Копируйте данные для договоров и делитесь карточкой с вашими партнерами
        в удобном формате.
      </p>
      <ul>
        <li>DOCX</li>
        <li>PDF</li>
        <li>Ссылка</li>
        <li>Email</li>
      </ul>
      <p>
        Открытый доступ к карточке без интернета с мобильного телефона.
        Сохраните на мобильном HomeScreen.
      </p>
      <el-button
        type="primary"
        class="card-intro-block-action"
        @click="$emit('toggle')"
      >
        Сгенерировать карточку
      </el-button>
    </div>
    <div class="card-intro-block">
      <div class="card-intro-block-img">
        <img src="@/assets/img/bcard-logo.svg" />
      </div>
      <p>Не требует регистрации и предоставляется - БЕСПЛАТНО</p>
      <p>*Дата актуальности справочников: {{ actualDate }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "CardIntro",
  computed: {
    actualDate() {
      return new Date().toLocaleDateString();
    },
  },
};
</script>
<style lang="scss" scoped>
.card-intro {
  display: flex;

  &-block {
    flex: 1;

    & > &-action {
      font-size: 16px;
      font-weight: 600;
    }

    & > h1 {
      font-weight: 500;
      font-size: 48px;
      margin-bottom: 30px;
    }
    & > p {
      margin-bottom: 30px;
      font-size: 16px;
      font-weight: 300;
      color: #a9a9a9;
      width: 100%;
    }
    & > ul {
      margin-bottom: 30px;

      & > li {
        display: inline;
        margin-right: 20px;
        font-size: 16px;
        font-weight: 300;
        color: #a9a9a9;
        position: relative;
        &:not(:last-child)::after {
          content: "";
          height: 6px;
          width: 6px;
          background-color: #0a81ff;
          border-radius: 50%;
          display: block;
          position: absolute;
          top: 50%;
          right: -12px;
          transform: translate(0, -50%);
        }
      }
    }
    &:nth-child(2) {
      align-items: flex-end;
      & > p {
        text-align: right;
      }
    }
    &-img {
      display: flex;
      top: 0px;
      right: 0px;
      margin-bottom: 20px;
      justify-content: flex-end;
      & > img {
        max-height: 246px;
        max-width: 400px;
        float: right;
      }
      & + p {
        color: #0a81ff;
        font-weight: 600;
        & + p {
          font-size: 13px;
          color: #666666;
        }
      }
      & ~ p {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
