import { Plugin } from "@nuxt/types";
import Vue from "vue";
import base from "./base";

const plugin: Plugin = () => {
  Vue.component("N2Button", base);
};

export default plugin;
