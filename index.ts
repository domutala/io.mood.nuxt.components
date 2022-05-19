import { Plugin } from "@nuxt/types";
import components from "./components";
import style from "./style";

const plugin: Plugin = (context, inject) => {
  style(context, inject);
  components(context, inject);
};

export default plugin;
