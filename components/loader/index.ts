import { Plugin } from "@nuxt/types";
import Vue from "vue";
import base from "./base";

const plugin: Plugin = () => {
  Vue.component("N2Loader", base);
};

export default plugin;
