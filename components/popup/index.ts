import { Plugin } from "@nuxt/types";
import Vue from "vue";

import events from "./events";

import base from "./base";
import modal from "./modal.vue";
import dropper from "./droppered.vue";
import dropperBase from "./dropperBase.vue";

export { events };
export { base };

const plugin: Plugin = () => {
  events();

  Vue.component("N2Popup", base);
  Vue.component("N2Modal", modal);
  Vue.component("N2Dropper", dropper);
  Vue.component("N2DropperBase", dropperBase);
};

export default plugin;
