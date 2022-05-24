import { Component, Watch } from "nuxt-property-decorator";
import { CreateElement } from "vue";
import NInputBase from "./base";

@Component
export default class NInput extends NInputBase {
  openDropper = false;

  get onListeners() {
    return {
      focus: (event: any) => {
        event.target.blur();
      },
    };
  }

  get formated() {
    if (!this.value) return "";

    const v = this.$nuxt.context.$utils.datetime.formater(this.value);
    return v;
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

        h("div", {}, [
          this.openDropper
            ? h("n2-date", {
                props: { value: this.value },
                on: { input: this.onInput },
              })
            : null,
        ]),
      ]
    );
  }

  mounted() {
    this.onValue();
  }

  onInpute(ev: any) {
    this.$emit("input", ev.target.value);
  }

  onInput(value: Date) {
    this.$emit("input", value);
    this.popupCloser();
  }

  @Watch("value", { deep: true })
  onValue() {
    // const input = this.$refs.input as HTMLInputElement;
    // if (!input) return;
    // input.value = typeof this.value !== "undefined" ? this.value : "";
  }
}
