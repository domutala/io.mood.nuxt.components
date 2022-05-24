import Vue from "vue";
import { Plugin } from "@nuxt/types";

import base from "./base";

import loupe from "./contents/loupe.svg?inline";
import loupe2 from "./contents/loupe2.svg?inline";
import loader from "./contents/loader.svg?inline";
import chat from "./contents/chat.svg?inline";
import man from "./contents/man.svg?inline";
import woman from "./contents/woman.svg?inline";
import check from "./contents/check.svg?inline";
import close from "./contents/close.svg?inline";

const plugin: Plugin = () => {
  Vue.component("N2Svg", base);
  Vue.component("N2SvgLoupe", loupe);
  Vue.component("N2SvgLoupe2", loupe2);
  Vue.component("N2SvgLoader", loader);
  Vue.component("N2SvgChat", chat);
  Vue.component("N2SvgMan", man);
  Vue.component("N2SvgWoman", woman);
  Vue.component("N2SvgCheck", check);
  Vue.component("N2SvgClose", close);
};

export default plugin;
