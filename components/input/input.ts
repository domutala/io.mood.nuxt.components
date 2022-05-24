import { Component, Prop, Watch } from "nuxt-property-decorator";
import { CreateElement } from "vue";
import NInputBase from "./base";

@Component
export default class NInput extends NInputBase {
  @Prop({ type: String, default: "text" }) type!: string;

  get onListeners() {
    return {
      ...this.listeners,
      input: (event: any) => {
        this.$emit("input", event.target.value);
      },
    };
  }

  render(h: CreateElement) {
    return this.template(
      h,
      h("input", {
        attrs: {
          type: this.type,
          required: this.required,
          readonly: this.readonly,
          name: this.name,
          id: this.id,
        },
        ref: "input",
        on: this.onListeners,
      })
    );
  }

  mounted() {
    this.onValue();

    // setTimeout(() => {
    //   const input = this.$refs.input as HTMLInputElement;
    //   if (!input) return;

    //   // input.addEventListener("input", this.onInput);
    // }, 100);
  }

  onInpute(ev: any) {
    this.$emit("input", ev.target.value);
  }

  @Watch("value", { deep: true })
  onValue() {
    const input = this.$refs.input as HTMLInputElement;
    if (!input) return;

    input.value = typeof this.value !== "undefined" ? this.value : "";
  }
}
