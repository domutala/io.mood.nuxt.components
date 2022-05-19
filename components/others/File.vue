<template>
  <div @click="on_click">
    <input
      ref="input"
      type="file"
      hidden
      :multiple="multiple"
      :accept="accept"
      :required="requred"
      @change="on_change"
    />
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "nuxt-property-decorator";
import { Base } from "~/mood/components";

@Component
export default class extends Base {
  @Prop()
  value!: any;

  @Prop({ type: String, default: "" })
  accept!: string;

  @Prop({ type: Boolean, default: false })
  requred!: string;

  @Prop({ type: Boolean, default: false })
  multiple!: string;

  mounted() {
    this.init();
  }

  @Watch("value", { deep: true })
  init() {
    const input = this.$refs.input as HTMLInputElement;
    input.files = this.value;

    if (this.value instanceof FileList) {
      if (!this.value.length) input.value = "";
    } else input.value = "";
  }

  on_click() {
    const input = this.$refs.input as HTMLInputElement;
    input.click();
  }

  on_change() {
    const input = this.$refs.input as HTMLInputElement;

    if (!input.files?.length) return;
    this.$emit("input", input.files);
  }
}
</script>
