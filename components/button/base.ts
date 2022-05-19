import { Prop } from "nuxt-property-decorator";
import { CreateElement } from "vue";
import { Component } from "vue-property-decorator";
import { Base } from "..";

import "./style.scss";

@Component
export default class NSwitech extends Base {
  @Prop({ type: String }) type!: string;
  @Prop({ type: String }) block!: string;
  @Prop({ type: Boolean, default: false }) icon!: boolean;
  @Prop({ type: Boolean, default: false }) loading!: boolean;
  @Prop({ type: Boolean, default: false }) disabled!: boolean;

  // color
  @Prop({ type: Boolean, default: false }) danger!: boolean;
  @Prop({ type: Boolean, default: false }) success!: boolean;
  @Prop({ type: Boolean, default: false }) warning!: boolean;
  @Prop({ type: Boolean, default: false }) dark!: boolean;
  @Prop({ type: Boolean, default: false }) light!: boolean;
  @Prop({ type: Boolean, default: false }) black!: boolean;
  @Prop({ type: Boolean, default: false }) white!: boolean;

  // type
  @Prop({ type: Boolean, default: false }) shine!: boolean;
  @Prop({ type: Boolean, default: false }) transparent!: boolean;
  @Prop({ type: Boolean, default: false }) border!: boolean;

  // radius
  @Prop({ type: Boolean, default: false }) circle!: boolean;
  @Prop({ type: Boolean, default: false }) round!: boolean;
  @Prop({ type: Boolean, default: false }) square!: boolean;

  // size
  @Prop({ type: Boolean, default: false }) sm!: boolean;
  @Prop({ type: Boolean, default: false }) xs!: boolean;
  @Prop({ type: Boolean, default: false }) lg!: boolean;

  render(h: CreateElement) {
    return h(
      "button",
      {
        staticClass: "nbutton2",
        on: this.listeners,
        class: {
          // color
          danger: this.danger,
          success: this.success,
          warning: this.warning,
          dark: this.dark,
          light: this.light,
          black: this.black,
          white: this.white,

          // type
          shine: this.shine,
          transparent: this.transparent,
          border: this.border,

          // radius
          circle: this.circle,
          square: this.square,
          round: this.round,

          // size
          sm: this.sm,
          xs: this.xs,
          lg: this.lg,

          block: this.block,
          icon: this.icon,
        },
        attrs: { type: this.type, disabled: this.disabled },
      },

      [
        h("div", { staticClass: "before" }),
        h("div", { staticClass: "after" }),
        this.$slots.default,
        h("div", { staticClass: "over" }, [
          this.loading
            ? h("div", { staticClass: "loading" }, [
                h("n2-loader", {
                  props: {
                    color:
                      this.dark || this.black
                        ? "rgba(var(--white), 1)"
                        : "rgba(var(--black), 1)",
                  },
                }),
              ])
            : null,
        ]),
      ]
    );
  }

  mounted() {}
}
