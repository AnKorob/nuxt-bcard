import Vue from "vue";

const copy = {
  install(Vue) {
    Vue.prototype.$copy = function (message = "", notification = true) {
      notification && this.$message("Скопировано");

      const textArea = document.createElement("textarea");
      textArea.value = message;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand?.("copy");
      textArea.blur();
      document.body.removeChild(textArea);
      navigator.clipboard?.writeText(message);
    };
  },
};

Vue.use(copy);
