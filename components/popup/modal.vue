<template>
  <n2-popup
    ref="popup"
    :blur="blur"
    :close-on-back="closeOnBack"
    :close-on-esc="closeOnEsc"
    class="nmodal2"
    @close="$emit('close')"
  >
    <n2-scroller ref="scroller" class="popup-modal content">
      <div class="spinner">
        <div></div>
      </div>

      <slot />
    </n2-scroller>
  </n2-popup>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Base } from "~/mood/components";

@Component
export default class extends Base {
  @Prop({ type: Boolean, default: false })
  blur!: boolean;

  @Prop({ type: Boolean, default: true })
  closeOnBack!: boolean;

  @Prop({ type: Boolean, default: true })
  closeOnEsc!: boolean;

  mounted() {
    this.sizer();
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.sizer);
  }

  sizer() {
    // const content = this.$refs.scroller as Vue;
    // const content = this.$refs.content as HTMLDivElement;
    // const max_height = window.innerHeight * 0.9;
    // (content.$el as HTMLDivElement).style.maxHeight = `${max_height}px`;
  }

  closer() {
    const popup = this.$refs.popup as any;
    popup.close();
  }
}
</script>

<style lang="scss">
@import "~/mood/style/_variables";

.nmodal2 {
  > .popup-modal {
    background-color: rgba(var(--light), 1);
    border-radius: 0.6em;
    max-width: 90%;
    max-height: 90%;
    box-shadow: var(--shadow-color) 0px 7px 29px 0px;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .spinner {
      height: 20px;
      position: sticky;
      top: 0;
      background-color: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      display: none;

      > div {
        width: 30px;
        height: 5px;
        background-color: rgba(var(--dark), 01);
        border-radius: 0.6em;
      }

      @media (max-width: $xs-screen) {
        display: flex;
      }
    }

    @media (max-width: $xs-screen) {
      max-width: 100% !important;
      max-height: 90% !important;
      width: 100% !important;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;

      top: 100%;
      transform: translate(-50%, -100%);
    }
  }
}
</style>
