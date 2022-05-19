<template>
  <div class="ndropper">
    <slot name="button" />

    <n-popup
      v-if="openned"
      v-show="showed"
      ref="fake"
      class="ndropper-popup arrow-top"
      disabled-back
      @close="closer"
    >
      <div ref="popup" class="dropper-popup" :class="{ square }">
        <span v-show="showSpin" ref="spin" class="spin"></span>
        <div ref="content" class="content">
          <slot />
        </div>
      </div>
    </n-popup>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { Base } from "~/mood/components";

@Component
export default class extends Base {
  @Prop({ type: [String, Array], default: "click" })
  events!: string | string[];

  @Prop({ type: [String, Number], default: 500 }) zIndex!: number;

  @Prop({ type: Boolean, default: false })
  showSpin!: boolean;

  @Prop({ type: Boolean, default: false })
  square!: boolean;

  openned = false;
  showed = false;
  uid = "";

  mounted() {
    this.init();
  }

  init() {
    const key = `[${this.$attr}] > *`;
    const children = this.$el.querySelectorAll(key);
    if (children.length !== 1) {
      const message = "Dropper component requires exactly one element.";
      const error = new Error(message);
      throw error;
    }

    this.uid = this.$nuxt.context.$utils.token.generate();

    const button = this.$el as HTMLDivElement;
    const events = Array.isArray(this.events) ? this.events : [this.events];

    window.addEventListener("resize", this.rebuild);

    for (const event of events) {
      button.addEventListener(event, () => {
        this.toOpen();
      });
    }
  }

  rebuild() {
    if (this.openned && this.showed) this.open();
  }

  toOpen() {
    if (this.openned) return;
    setTimeout(this.open, 120);
  }

  open() {
    this.openned = true;

    setTimeout(() => {
      // const popup = this.$refs.popup as HTMLDivElement;
      const button = this.$el as HTMLDivElement;
      const rect = button.getBoundingClientRect();
      const popup = this.$refs.popup as HTMLDivElement;
      const content = this.$refs.content as HTMLDivElement;

      let vertAlign: "bottom" | "top" = "bottom";
      let horizAlign: "left" | "right" = "left";

      // set vertical align
      if (window.innerHeight - rect.top > rect.top) vertAlign = "top";
      else vertAlign = "bottom";

      // set horizontal align
      if (window.innerWidth - rect.left < 450) horizAlign = "right";
      else horizAlign = "left";

      let vertCoord = 0;
      let horizCoord = 0;

      if (vertAlign === "bottom") vertCoord = window.innerHeight - rect.top;
      else vertCoord = rect.top + button.offsetHeight;

      if (horizAlign === "right") horizCoord = window.innerWidth - rect.right;
      else horizCoord = rect.left;

      // set max-height
      let maxHeight = 0;
      if (vertAlign === "bottom") maxHeight = rect.top;
      else maxHeight = window.innerHeight - rect.bottom;

      // set max-width
      let maxWidth = 0;
      if (horizAlign === "left") maxWidth = window.innerWidth - rect.left;
      else maxWidth = rect.right;

      const spinHeight = this.showSpin ? 10 : 5;

      // set margin
      popup.style[`margin-${vertAlign}` as "margin"] = `${spinHeight}px`;

      // set attributes
      popup.setAttribute(`align-${vertAlign}`, "");
      popup.setAttribute(`align-${horizAlign}`, "");

      // spin position
      const spin = this.$refs.spin as HTMLDivElement;
      spin.style[vertAlign] = "0";
      spin.style[horizAlign] = "10px";

      popup.style[vertAlign] = `${vertCoord}px`;
      popup.style[horizAlign] = `${horizCoord}px`;
      popup.style.maxWidth = `${maxWidth}px`;
      popup.style.zIndex = `${parseInt(this.zIndex.toString()) + 1}`;

      content.style.maxHeight = `${maxHeight - spinHeight}px`;

      this.showed = true;
      this.$emit("open");
    }, 200);
  }

  closer() {
    this.showed = false;
    this.openned = false;
    this.$emit("close");
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.rebuild);
    this.closer();
  }
}
</script>

<style lang="scss">
.ndropper-popup {
  .dropper-popup {
    position: absolute;
    box-shadow: rgba(var(--dark), 0.06) 0px 0px 0px 1px;
    // border: 1px solid rgba(var(--dark), 0.1);
    transition: all 0.3s ease;
    background-color: rgba(var(--light), 1);
    border-radius: 6px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      border-radius: inherit;
      box-shadow: var(--shadow-color) 0px 8px 24px;
      box-shadow: var(--shadow-color) 0px 4px 12px;
    }

    &.square {
      border-radius: 0;
    }

    .content {
      background-color: inherit;
      position: relative;
      overflow: auto;
      border-radius: inherit;

      > * {
        max-width: 100%;
      }

      &::-webkit-scrollbar {
        width: 7px;
        margin-top: 50px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: rgba(var(--dark), 0.1);
        border-radius: inherit;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: rgba(var(--dark), 0.2);
        border-radius: inherit;

        &:hover {
          background: rgba(var(--dark), 0.5);
        }
      }
    }

    .spin {
      content: "";
      background-color: inherit;
      position: absolute;
      border-radius: 7px 0 0 0;
      box-shadow: inherit;
      border: inherit;
      width: 15px;
      height: 15px;
      z-index: 0;
    }

    &[align-top] {
      .spin {
        transform: translateY(-50%) rotate(45deg);
      }
    }

    &[align-bottom] {
      .spin {
        transform: translateY(50%) rotate(225deg);
      }
    }
  }
}
</style>
