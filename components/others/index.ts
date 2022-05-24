import { Plugin } from "@nuxt/types";
import Vue from "vue";

import File from "./File.vue";
import Img from "./Img.vue";
import LoaderComponent from "./LoaderComponent.vue";
import Scroller from "./Scroller.vue";
import Select from "./Select.vue";

const plugin: Plugin = () => {
  Vue.component("N2File", File);
  Vue.component("N2Img", Img);
  Vue.component("N2LoaderComponent", LoaderComponent);
  Vue.component("N2Scroller", Scroller);
  Vue.component("N2Select", Select);
};

export default plugin;
