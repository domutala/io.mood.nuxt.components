import { CreateElement } from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Base } from "..";

@Component
export default class NSwitech extends Base {
  @Prop({ type: String, default: "" }) color!: string;
  @Prop({ default: 22 }) size!: any;
  @Prop({ type: Boolean, default: false }) light!: boolean;

  render(h: CreateElement) {
    return h("div", {
      staticClass: "nloader2",
      style: {
        width: `${this.size}px`,
        height: `${this.size}px`,
        color: this.color,
      },
    });
  }

  mounted() {
    this.$el.innerHTML = `<svg viewBox="0 0 38 38" stroke="currentColor" stroke-opacity=".5">
      <g fill="none" fill-rule="evenodd">
        <g transform="translate(1 1)" stroke-width="2">
          <circle stroke-opacity=".3" cx="18" cy="18" r="18"></circle>
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>`;
  }
}
