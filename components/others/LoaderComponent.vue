<template>
  <div
    class="loader-compoent"
    :style="{ backgroundColor: color, height, width, borderRadius: radius }"
  >
    <div class="_e-loader"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class MLoader extends Vue {
  @Prop({ type: String, default: "rgba(var(--dark), .05)" })
  color!: string;

  @Prop({ default: "70px", type: String })
  height!: string;

  @Prop({ default: "70px", type: String })
  width!: string;

  @Prop({ default: "0px", type: String })
  radius!: string;
}
</script>

<style lang="scss" scoped>
.loader-compoent {
  position: relative;
  border-radius: 15px;
  position: relative;

  > div {
    animation-duration: 1.25s;
    animation-duration: 20s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: eloaderAnimation;
    animation-timing-function: linear;
    background: linear-gradient(
      to right,
      rgba(var(--surface), 0) 8%,
      rgba(var(--dark), 0.03) 18%,
      rgba(var(--surface), 0) 33%
    );
    // background-size: 800px 104px;
    background-size: 500%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  &:not(:last-child) {
    margin-bottom: 5px;
  }
}

@keyframes eloaderAnimation {
  0% {
    // background-position: -468px 0;
    background-position: 500% 0;
  }
  100% {
    background-position: -500% 0;
  }
}
</style>
