<template>
  <button
    class="nbutton"
    :class="{
      circle,
      round,
      square,
      block,
      center,
      border,
      sm,
      xs,
      lg,
      shine,
      transparent,
      icon,
      danger,
      success,
      dark,
      light,
      black,
      white,
    }"
    :disabled="disabled"
    :type="type"
    v-on="listeners"
  >
    <div class="content">
      <slot />
    </div>

    <div v-if="loading" class="loading">
      <n-loader size="24" color="rgba(var(--black), 1)" />
    </div>
  </button>
</template>

<script lang="ts">
import { Prop } from "nuxt-property-decorator";
import { Component } from "vue-property-decorator";
import { Base } from "..";

@Component
export default class extends Base {
  @Prop({ type: Boolean, default: false }) circle!: boolean;
  @Prop({ type: Boolean, default: false }) round!: boolean;
  @Prop({ type: Boolean, default: false }) square!: boolean;
  @Prop({ type: Boolean, default: false }) block!: boolean;
  @Prop({ type: Boolean, default: false }) disabled!: boolean;
  @Prop({ type: Boolean, default: false }) center!: boolean;
  @Prop({ type: Boolean, default: false }) shine!: boolean;
  @Prop({ type: Boolean, default: false }) transparent!: boolean;
  @Prop({ type: Boolean, default: false }) icon!: boolean;
  @Prop({ type: Boolean, default: false }) border!: boolean;
  @Prop({ type: Boolean, default: false }) loading!: boolean;

  // size
  @Prop({ type: Boolean, default: false }) sm!: boolean;
  @Prop({ type: Boolean, default: false }) xs!: boolean;
  @Prop({ type: Boolean, default: false }) lg!: boolean;

  // color
  @Prop({ type: Boolean, default: false }) danger!: boolean;
  @Prop({ type: Boolean, default: false }) success!: boolean;
  @Prop({ type: Boolean, default: false }) dark!: boolean;
  @Prop({ type: Boolean, default: false }) light!: boolean;
  @Prop({ type: Boolean, default: false }) black!: boolean;
  @Prop({ type: Boolean, default: false }) white!: boolean;

  @Prop({ type: String }) type!: string;

  mounted() {
    this.init();
  }

  init() {}
}
</script>

<style lang="scss">
@import "~/mood/style/index.scss";

.nbutton {
  height: $btn-size;
  min-width: $btn-size;
  border-radius: 0.3em;
  border: 0;
  padding: 0;
  position: relative;
  transition: all 0.25s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
  }

  .content {
    padding: 0 8px;
    position: relative;
    line-height: 1;
    display: flex;
    align-items: center;

    > * {
      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }

  .loading {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    background-color: rgba(var(--black), 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:active {
    transform: scale(0.95);
  }

  &:not(:disabled) {
    cursor: pointer;
  }

  &:hover:not(:disabled) {
    &::before {
      opacity: 1;
    }
  }

  &.block {
    display: block;
    width: 100%;
  }

  &.icon {
    .content {
      padding: 0;
    }
  }

  &.icon,
  &.center {
    .content {
      margin: auto;
      justify-content: center;
    }
  }

  &.circle {
    border-radius: 16em;
  }
  &.round {
    border-radius: 0.9em;
  }
  &.square {
    border-radius: 0;
  }

  // size
  &.sm {
    height: calc($btn-size * 0.8);
    min-width: calc($btn-size * 0.8);
    font-size: 86%;
  }

  &.xs {
    height: calc($btn-size * 0.55);
    min-width: calc($btn-size * 0.55);
    font-size: 70%;
  }

  &.lg {
    height: calc($btn-size * 1.5);
    min-width: calc($btn-size * 1.5);
    font-size: 120%;
  }

  &.shine {
    &::before {
      opacity: 0.2;
    }

    &:hover {
      &::before {
        opacity: 0.3;
      }
    }
  }

  &.border {
    &::before {
      border: 2px solid;
      background-color: transparent;
    }
  }
  &.transparent {
    &::before {
      opacity: 0;
    }

    &:hover:not(:disabled) {
      &::before {
        opacity: 0.1;
      }
    }
  }

  &:disabled {
    opacity: 0.3;
  }

  /** COLOR */
  color: rgba(var(--white), 1);
  &::before {
    background-color: rgba(var(--primary), 1);
  }

  &.transparent,
  &.shine,
  &.border {
    color: rgba(var(--primary), 1);
  }

  // danger
  &.danger {
    &::before {
      background-color: rgba(var(--danger), 1);
    }

    &.shine,
    &.border {
      color: rgba(var(--danger), 1);
    }
  }

  // success
  &.success {
    &::before {
      background-color: rgba(var(--success), 1);
    }

    &.shine,
    &.border {
      color: rgba(var(--success), 1);
    }
  }

  // dark
  &.dark {
    color: rgba(var(--light), 1);

    &::before {
      background-color: rgba(var(--dark), 1);
    }

    &.shine,
    &.border {
      color: rgba(var(--dark), 1);
    }
  }

  // light
  &.light {
    color: rgba(var(--dark), 1);

    &::before {
      background-color: rgba(var(--light), 1);
    }

    &.shine,
    &.border {
      color: rgba(var(--light), 1);
    }
  }

  // black
  &.black {
    color: rgba(var(--white), 1);

    &::before {
      background-color: rgba(var(--black), 1);
    }

    &.shine,
    &.border {
      color: rgba(var(--black), 1);
    }
  }

  // white
  &.white {
    color: rgba(var(--balck), 1);

    &::before {
      background-color: rgba(var(--white), 1);
    }

    &.shine,
    &.border {
      color: rgba(var(--white), 1);
    }
  }

  /** END COLOR */
}
</style>
