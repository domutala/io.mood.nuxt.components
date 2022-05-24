import { Component, Watch } from "nuxt-property-decorator";
import { CreateElement } from "vue";
import NInputBase from "./base";

import "./sexe.scss";

@Component
export default class NInput extends NInputBase {
  openDropper = false;
  minWidth = 0;

  get onListeners() {
    return {
      focus: (event: any) => {
        event.target.blur();
      },
    };
  }

  get formated() {
    if (this.value === 1) return "Homme";
    if (this.value === 2) return "Femme";

    return undefined;
  }

  render(h: CreateElement) {
    return h(
      "n2-dropper",
      {
        on: {
          open: () => (this.openDropper = true),
          close: () => (this.openDropper = false),
        },
      },
      [
        this.template(
          h,
          h("input", {
            attrs: {
              required: this.required,
              name: this.name,
              id: this.id,
              value: this.formated,
            },
            ref: "input",
            on: this.onListeners,
          }),
          "button"
        ),

        this.openDropper
          ? h(
              "div",
              {
                staticClass: "sexe-con",
                style: { minWidth: `${this.minWidth}px` },
              },
              [
                h("button", { on: { click: () => this.choice(1) } }, [
                  h("n2-svg", { props: { svg: "man" } }),
                  "Homme",
                ]),
                h("button", { on: { click: () => this.choice(2) } }, [
                  h("n2-svg", { props: { svg: "woman" } }),
                  "Femme",
                ]),
              ]
            )
          : null,
      ]
    );
  }

  mounted() {
    this.onValue();
    this.setMinWidth();
    window.addEventListener("resize", this.setMinWidth);
  }

  setMinWidth() {
    this.minWidth = this.$el.getBoundingClientRect().width;
  }

  choice(sexe: number) {
    this.popupCloser();
    this.$emit("input", sexe);
  }

  onInput(value: Date) {
    this.$emit("input", value);
    this.popupCloser();
  }

  @Watch("value", { deep: true })
  onValue() {
    if (![1, 2].includes(this.value)) this.$emit("input", null);
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.setMinWidth);
  }
}
