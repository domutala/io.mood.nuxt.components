import { Component, Prop } from "nuxt-property-decorator";
import { CreateElement, VNode } from "vue";
import { Base } from "..";

import "./style.scss";

@Component
export default class NInputBase extends Base {
  @Prop() value!: any;
  @Prop({ type: String, default: "" }) placeholder!: string;

  @Prop({ type: Boolean, default: false }) success!: boolean;
  @Prop({ type: Boolean, default: false }) error!: boolean;
  @Prop({ type: Boolean, default: false }) warning!: boolean;

  @Prop({ type: Boolean, default: false }) required!: boolean;
  @Prop({ type: Boolean, default: false }) readonly!: boolean;
  @Prop({ type: String }) name!: string;
  @Prop({ type: String }) id!: string;

  // radius
  @Prop({ type: Boolean, default: false }) circle!: boolean;
  @Prop({ type: Boolean, default: false }) round!: boolean;
  @Prop({ type: Boolean, default: false }) square!: boolean;

  isFocus = false;

  get isCon() {
    if (Array.isArray(this.value)) return this.value.length !== 0;
    if (typeof this.value === "string") return this.value.length !== 0;
    if (this.value === null) return false;
    return typeof this.value !== "undefined";
  }

  template(h: CreateElement, others?: VNode, slot?: string) {
    return h(
      "div",
      {
        staticClass: "ninput2",
        class: {
          focus: this.isFocus,
          con: this.isCon,

          error: this.error,
          success: this.success,
          warning: this.warning,

          // radius
          circle: this.circle,
          square: this.square,
          round: this.round,
        },
        slot,
      },
      [
        h("div", { staticClass: "over" }, [
          this.$slots.before,
          h("div", { staticClass: "in" }, [
            h("div", { class: "placeholder" }, this.placeholder),
            others,
            this.$slots.default,
          ]),
          this.$slots.after,
        ]),
        h("div", { staticClass: "info" }, [this.$slots.info]),
      ]
    );
  }

  render(h: CreateElement) {
    return this.template(h);
  }

  mounted() {
    this.$el.addEventListener("focusin", this.onf);
    this.$el.addEventListener("focusout", this.onb);
  }

  onf() {
    this.isFocus = true;
  }

  onb() {
    this.isFocus = false;
  }

  beforeDestroy() {
    this.$el.removeEventListener("focusin", this.onf);
    this.$el.removeEventListener("focusout", this.onb);
  }
}
