import Vue from "vue";

const flashMessage = {
  install(Vue) {
    Vue.prototype.$flashMessage = function (message = "") {
      this.$copy(message, false);
      const messageDiv = document.createElement("div");
      messageDiv.innerHTML = `
        <div class ="flash-message-header">Ссылка скопирована в буфер</div>
        <div class ="flash-message-content">${message}</div>
      `;
      messageDiv.classList.add("flash-message");

      document.body.appendChild(messageDiv);

      setTimeout(() => {
        document.body.removeChild(messageDiv);
        navigator.clipboard.writeText(message);
      }, 3000);
    };
  },
};

Vue.use(flashMessage);
