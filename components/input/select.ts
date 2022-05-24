import { Component, Prop } from "nuxt-property-decorator";
import { CreateElement, VNode } from "vue";
import NInputBase from "./base";

import "./select.scss";

@Component
export default class NInput extends NInputBase {
  @Prop({ type: Array, default: () => [] })
  options!: { text: string; icon: string; value: any }[];

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

  get isValueArray() {
    return Array.isArray(this.value);
  }

  get valueArray() {
    return this.isValueArray ? this.value : [this.value];
  }

  get valueInputer0() {
    const value = this.valueArray;
    const options = this.options.filter((opt) => value.includes(opt.value));

    return options;
  }

  render(h: CreateElement) {
    const options: VNode[] = [];
    const groups: VNode[] = [];

    for (const option of this.options) {
      options.push(
        h(
          "button",
          {
            class: { select: this.valueArray.includes(option.value) },
            on: { click: () => this.choice(option.value) },
          },
          [h("div", { staticClass: "index" }), option.text]
        )
      );
    }

    for (const value of this.valueInputer0) {
      groups.push(
        h(
          "button",
          {
            class: { select: this.valueArray.includes(value.value) },
            on: { click: () => this.choice(value.value) },
          },
          [h("div", value.text)]
        )
      );
    }

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
          this.isValueArray
            ? h("div", { staticClass: "input" }, [
                h(
                  "div",
                  {
                    staticClass: "select-group",
                    staticStyle: { minHeight: "16px" },
                  },
                  groups
                ),
              ])
            : h("input", {
                attrs: {
                  required: this.required,
                  name: this.name,
                  id: this.id,
                  value: this.valueInputer0.length
                    ? this.valueInputer0[0].text
                    : "",
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
                staticClass: "select-con",
                style: { minWidth: `${this.minWidth}px` },
              },
              options
            )
          : null,
      ]
    );
  }

  mounted() {
    // this.onValue();
    this.setMinWidth();
    window.addEventListener("resize", this.setMinWidth);
  }

  setMinWidth() {
    this.minWidth = this.$el.getBoundingClientRect().width;
  }

  choice(value: any) {
    if (Array.isArray(this.value)) {
      let values = this.value;
      const i = values.includes(value);

      if (i) values = values.filter((v) => v !== value);
      else values.push(value);

      this.$emit("input", values);
    } else {
      this.$emit("input", value);
      this.popupCloser();
    }
  }

  onInput(value: Date) {
    this.$emit("input", value);
    this.popupCloser();
  }

  // @Watch("value", { deep: true })
  // onValue() {
  //   if (![1, 2].includes(this.value)) this.$emit("input", null);
  // }

  beforeDestroy() {
    window.removeEventListener("resize", this.setMinWidth);
  }
}
