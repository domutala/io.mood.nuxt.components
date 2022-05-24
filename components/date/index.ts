import { Plugin } from "@nuxt/types";
import Vue from "vue";

import base from "./base.vue";

const plugin: Plugin = () => {
  Vue.component("N2Date", base);
};

export default plugin;
