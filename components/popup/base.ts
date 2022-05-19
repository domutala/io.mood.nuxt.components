import { Component, Prop } from "vue-property-decorator";
import { CreateElement } from "vue/types/umd";
import { Base } from "..";

import "./style.scss";

@Component
export default class extends Base {
  @Prop({ type: Boolean, default: true }) closeOnBack!: boolean;
  @Prop({ type: Boolean, default: true }) closeOnEsc!: boolean;
  @Prop({ type: Boolean, default: false }) disabledBack!: boolean;
  @Prop({
    type: [String, Number],
    default: 500,
    validator: (val) => !isNaN(val),
  })
  zIndex!: string;

  popupClicked = false;

  render(h: CreateElement) {
    return h("div", { staticClass: "npopup2" }, [this.$slots.default]);
  }

  mounted() {
    this.init();
  }

  beforeDestroy() {
    this.destroy();
  }

  init() {
    const key = `[${this.$attr}] > *`;

    const children = this.$el.querySelectorAll(key);
    if (children.length !== 1) {
      const error = new Error("Popup component requires exactly one element.");
      throw error;
    }

    if (this.disabledBack) this.$el.setAttribute("disabled-back", "");

    this.$el.setAttribute("popup", this.$attr);

    setTimeout(() => {
      window.addEventListener("keydown", this.onEscPress);
      window.addEventListener(`close-popup-${this.$attr}`, this.onBackClick);
    }, 100);

    const body = document.querySelector("body") as HTMLElement;
    setTimeout(this.setPopup, 100);

    if (body) {
      body.setAttribute("style", "overflow: hidden");
      body.appendChild(this.$el);
      this.$emit("open");
    }
  }

  setPopup() {
    const key = `[${this.$attr}] > :nth-child(1)`;
    const popup = this.$el.querySelector(key) as HTMLDivElement;
    if (!popup) return;

    popup.style.zIndex = this.zIndex;

    popup.addEventListener("click", () => {
      this.popupClicked = true;

      setTimeout(() => {
        this.popupClicked = false;
      }, 200);
    });
  }

  destroy() {
    window.removeEventListener("keydown", this.onEscPress);

    const body = document.querySelector("body");
    const modals = document.querySelectorAll(".npopup");

    if (body && modals.length <= 1) {
      body.setAttribute("style", "overflow: auto");
    }

    if (body && this.$el.parentNode === body) {
      body.removeChild(this.$el);
    }
  }

  close() {
    this.$emit("close");
  }

  onBackClick() {
    if (!this.closeOnBack) return;
    if (this.popupClicked) return;

    this.close();
  }

  onEscPress(e: any) {
    if (e.keyCode !== 27 || !this.closeOnEsc) return;

    const ev = new CustomEvent("close-popup");
    window.dispatchEvent(ev);
  }
}
