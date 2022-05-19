import { Plugin } from "@nuxt/types";
import Vue from "vue";

import Date from "./Date.vue";
import DateTabler from "./DateTabler.vue";
import Dropper from "./Dropper.vue";
import File from "./File.vue";
import Img from "./Img.vue";
import LoaderComponent from "./LoaderComponent.vue";
import Modal from "./Modal.vue";
import Select from "./Select.vue";

const plugin: Plugin = () => {
  Vue.component("N2Date", Date);
  Vue.component("N2DateTabler", DateTabler);
  Vue.component("N2Dropper", Dropper);
  Vue.component("N2File", File);
  Vue.component("N2Img", Img);
  Vue.component("N2LoaderComponent", LoaderComponent);
  Vue.component("N2Modal", Modal);
  Vue.component("N2Select", Select);
};

export default plugin;
