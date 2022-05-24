import { CreateElement } from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Base } from "..";

@Component
export default class NSvg extends Base {
  @Prop({ type: String, default: "" }) fill!: string;
  @Prop({ default: 22 }) size!: number | string;
  @Prop({ type: String, required: true }) svg!: string;

  // color
  @Prop({ type: Boolean, default: false }) primary!: boolean;
  @Prop({ type: Boolean, default: false }) danger!: boolean;
  @Prop({ type: Boolean, default: false }) success!: boolean;
  @Prop({ type: Boolean, default: false }) warning!: boolean;
  @Prop({ type: Boolean, default: false }) dark!: boolean;
  @Prop({ type: Boolean, default: false }) light!: boolean;
  @Prop({ type: Boolean, default: false }) black!: boolean;
  @Prop({ type: Boolean, default: false }) white!: boolean;

  get filled() {
    const k = this.primary
      ? "primary"
      : this.danger
      ? "danger"
      : this.success
      ? "success"
      : this.warning
      ? "warning"
      : this.dark
      ? "dark"
      : this.light
      ? "light"
      : this.black
      ? "black"
      : this.white
      ? "white"
      : null;

    if (k) return `rgba(var(--${k}), 1)`;

    return this.fill;
  }

  render(h: CreateElement) {
    return h(`n2-svg-${this.svg}`, {
      style: {
        width: `${this.size}px`,
        height: `${this.size}px`,
        fill: this.filled,
      },
    });
  }
}
