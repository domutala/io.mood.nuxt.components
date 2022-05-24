<template>
  <div class="ndropper">
    <slot name="button" />
    <n2-dropper-base
      :key="mdattr"
      :parent="`[${mdattr}]`"
      @close="$emit('close')"
      @open="$emit('open')"
    >
      <slot />
    </n2-dropper-base>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Base } from "..";

@Component
export default class extends Base {
  @Prop({ type: [String, Array], default: "click" }) events!: string | string[];
  @Prop({ type: [String, Number], default: 500 }) zIndex!: number;
  @Prop({ type: Boolean, default: false }) showSpin!: boolean;
  @Prop({ type: Boolean, default: false }) square!: boolean;
}
</script>
