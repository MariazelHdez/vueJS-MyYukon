import "vuetify/styles";
import "../assets/yk-style.css";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default createVuetify({
  components: {
    ...components
  },
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#0097a9",
          secondary: "#fff",
          anchor: "#00818f"
        }
      }
    }
  }
});
