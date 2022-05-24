import { Plugin } from "@nuxt/types";
import Vue from "vue";

import Base from "./base";

import loader from "./loader";
import inpute from "./input";
import popup from "./popup";
import switche from "./switch";
import button from "./button";
import date from "./date";
import others from "./others";
import svgs from "./svgs";

export { Base };

const plugin: Plugin = (context, inject) => {
  Vue.component("N2Base", Base);

  inpute(context, inject);
  loader(context, inject);
  popup(context, inject);
  switche(context, inject);
  others(context, inject);
  button(context, inject);
  date(context, inject);
  svgs(context, inject);
};

export default plugin;
