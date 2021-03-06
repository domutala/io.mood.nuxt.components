import { Vue, Component } from "vue-property-decorator";

@Component
export default class Base extends Vue {
  mdattr = "";

  get listeners() {
    return {
      ...this.$listeners,
      click: (event: any) => {
        this.$emit("click", event);
      },
      dblclick: (event: any) => {
        this.$emit("dblclick", event);
      },
      focus: (event: any) => {
        this.$emit("focus", event);
      },
      focusin: (event: any) => {
        this.$emit("focusin", event);
      },
      focusout: (event: any) => {
        this.$emit("focusout", event);
      },
      blur: (event: any) => {
        this.$emit("blur", event);
      },
      scroll: (event: any) => {
        this.$emit("scroll", event);
      },
      resize: (event: any) => {
        this.$emit("resize", event);
      },
      keyup: (event: any) => {
        this.$emit("keyup", event);
      },
      keydown: (event: any) => {
        this.$emit("keydown", event);
      },
      keypress: (event: any) => {
        this.$emit("keypress", event);
      },
      mouseenter: (event: any) => {
        this.$emit("mouseenter", event);
      },
      mouseleave: (event: any) => {
        this.$emit("mouseleave", event);
      },
      mousedown: (event: any) => {
        this.$emit("mousedown", event);
      },
      mousemove: (event: any) => {
        this.$emit("mousemove", event);
      },
      mouseout: (event: any) => {
        this.$emit("mouseout", event);
      },
      mouseup: (event: any) => {
        this.$emit("mouseup", event);
      },
      mousewheel: (event: any) => {
        this.$emit("mousewheel", event);
      },
      touchstart: (event: any) => {
        this.$emit("touchstart", event);
      },
      touchmove: (event: any) => {
        this.$emit("touchmove", event);
      },
      touchcancel: (event: any) => {
        this.$emit("touchcancel", event);
      },
      touchend: (event: any) => {
        this.$emit("touchend", event);
      },
    };
  }

  beforeMount() {
    this.mdattr = this.$nuxt.context.$utils.token.generate({ length: 8 });
    this.mdattr = `data-md-${this.mdattr}`;
  }

  mounted() {
    if (typeof this.$el.setAttribute === "function") {
      this.$el.setAttribute(this.mdattr, "");
    }

    this.$$init();
  }

  popupCloser() {
    this.$$popupCloser();
  }

  $$init() {}

  $$popupCloser() {
    this.emitEvent("close-popup");
  }

  emitEvent(name: string, detail?: any) {
    this.$$emit(name, detail);
  }

  emit(name: string, detail?: any) {
    this.$$emit(name, detail);
  }

  $$emit(name: string, detail?: any) {
    const ev = new CustomEvent(name, { detail });
    window.dispatchEvent(ev);
  }
}
