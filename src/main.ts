import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vuetify/styles"; // Global CSS has to be imported
import { createVuetify, type ThemeDefinition } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import store from "./store/index";
import "@mdi/font/css/materialdesignicons.css";

import "./assets/main.css";

const app = createApp(App);

app.use(store);
app.use(router);

const MeHowTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#141414",
    surface: "#141414",
    primary: "#00DAC5",
    "primary-darken-1": "#3700B3",
    secondary: "#03DAC6",
    "secondary-darken-1": "#018786",
    error: "#941012",
    "light-error": "#fc0808",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
  },
};

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "myCustomLightTheme",
    themes: {
      MeHowTheme,
    },
  },
});

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "MeHowTheme",
    themes: {
      MeHowTheme,
    },
  },
});

app.use(vuetify);

app.mount("#app");
