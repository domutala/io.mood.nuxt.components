import { Plugin } from "@nuxt/types";
import Vue from "vue";

import events from "./events";
import base from "./base";

export { events };
export { base };

const plugin: Plugin = () => {
  events();

  Vue.component("N2Popup", base);
};

export default plugin;
