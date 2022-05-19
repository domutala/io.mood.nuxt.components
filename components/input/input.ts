import { Component, Prop, Watch } from "nuxt-property-decorator";
import { CreateElement } from "vue";
import NInputBase from "./base";

@Component
export default class NInput extends NInputBase {
  @Prop({ type: String, default: "text" }) type!: string;

  template(h: CreateElement) {
    return h("input", {
      attrs: {
        type: this.type,
        required: this.required,
        name: this.name,
        id: this.id,
      },
      ref: "input",
    });
  }

  mounted() {
    this.onValue();

    setTimeout(() => {
      const input = this.$refs.input as HTMLInputElement;
      if (!input) return;

      input.addEventListener("input", this.onInput);
    }, 100);
  }

  onInput(ev: any) {
    this.$emit("input", ev.target.value);
  }

  @Watch("value", { deep: true })
  onValue() {
    const input = this.$refs.input as HTMLInputElement;
    if (!input) return;

    input.value = this.value;
  }
}
