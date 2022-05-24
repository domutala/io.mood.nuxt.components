<template>
  <div class="nscroller2">
    <slot />
    <div ref="scroll" class="scroll"></div>
    <div ref="spin" class="spin"></div>
  </div>
</template>

<script lang="ts">
import { Component } from "nuxt-property-decorator";
import Base from "../base";

@Component
export default class extends Base {
  mounted() {
    this.$el.addEventListener("scroll", this.onScroll);
    window.addEventListener("resize", this.build);
    this.build();
  }

  updated() {
    this.build();
  }

  build() {
    const spin = this.$refs.spin as HTMLDivElement;
    const scroll = this.$refs.scroll as HTMLDivElement;

    scroll.style.height = "0";
    spin.style.top = "0";

    setTimeout(() => {
      scroll.style.height = `${(this.$el as HTMLDivElement).scrollHeight}px`;

      const el = this.$el as HTMLDivElement;
      const x1 = (el.offsetHeight * 100) / el.scrollHeight;

      spin.style.height = `${x1}%`;

      const w = el.scrollHeight > el.offsetHeight ? 7 : 0;
      spin.style.width = `${w}px`;
      scroll.style.width = `${w}px`;

      this.onScroll();
    }, 10);
  }

  onScroll() {
    const el = this.$el as HTMLDivElement;
    const spin = this.$refs.spin as HTMLDivElement;

    const p = el.scrollTop / el.scrollHeight;

    spin.style.marginTop = `${this.$el.scrollTop + p * el.offsetHeight}px`;
    console.log();
  }

  beforeDestroy() {
    this.$el.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.build);
  }
}
</script>

<style lang="scss">
.nscroller2 {
  overflow: auto;
  border-radius: inherit;
  background-color: inherit;
  position: relative;

  > .scroll {
    position: absolute;
    top: 0;
    right: 0px;
    width: 7px;
    background: rgba(var(--dark), 0.1);
    z-index: 500;
    display: none;
    user-select: none;
  }

  > .spin {
    height: 100px;
    width: 7px;
    top: 0;
    right: 0;
    position: absolute;
    z-index: 501;
    display: none;
    user-select: none;
    background: rgba(var(--dark), 0.2);

    &:hover {
      background: rgba(var(--dark), 0.5);
    }
  }

  &:hover {
    > .scroll {
      display: block;
    }
    > .spin {
      display: block;
    }
  }

  &::-webkit-scrollbar {
    width: 0px;
    border-radius: inherit;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: rgba(var(--dark), 0.1);
    // border-radius: inherit;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(var(--dark), 0.2);
    // border-radius: inherit;

    &:hover {
      background: rgba(var(--dark), 0.5);
    }
  }
}
</style>
