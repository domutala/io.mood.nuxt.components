<template>
  <n-popup
    ref="popup"
    :blur="blur"
    :close-on-back="closeOnBack"
    :close-on-esc="closeOnEsc"
    class="nmodal"
    @close="$emit('close')"
  >
    <div class="popup-modal">
      <div>
        <div class="spinner">
          <div></div>
        </div>
        <div ref="content" class="ve">
          <slot />
        </div>
      </div>
    </div>
  </n-popup>
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
    this.init();
  }

  beforeDestroy() {
    this.destroy();
  }

  init() {
    this.sizer();
  }

  sizer() {
    const content = this.$refs.content as HTMLDivElement;
    const max_height = window.innerHeight * 0.9;
    content.style.maxHeight = `${max_height}px`;
  }

  destroy() {
    window.removeEventListener("resize", this.sizer);
  }

  closer() {
    const popup = this.$refs.popup as any;
    popup.close();
  }
}
</script>

<style lang="scss">
@import "~/mood/style/_variables";

.nmodal {
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

    > div {
      border-radius: inherit;
      overflow: hidden;

      > .spinner {
        height: 10px;
        position: sticky;
        top: 0;
        background-color: inherit;
        display: flex;
        align-items: center;
        justify-content: center;
        display: none;

        > div {
          width: 50px;
          height: 5px;
          background-color: rgba(var(--dark), 0.5);
          border-radius: 0.6em;
        }

        @media (max-width: $xs-screen) {
          display: flex;
        }
      }

      > .ve {
        overflow: auto;
        border-radius: inherit;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
          border-radius: inherit;
          box-shadow: rgba(var(--dark), 0.06) 0px 0px 0px 1px;
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
