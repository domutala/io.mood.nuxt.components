import { Prop, Watch } from "nuxt-property-decorator";
import { CreateElement } from "vue";
import { Component } from "vue-property-decorator";
import { Base } from "..";

import "./style.scss";

@Component
export default class NSwitech extends Base {
  @Prop() src!: any;

  render(h: CreateElement) {
    return h("div", {
      staticClass: "nimg2",
      on: this.listeners,
    });
  }

  mounted() {
    this.init();
  }

  @Watch("src", { deep: true })
  init() {
    const re = /(^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$)/gm;
    if (this.src) {
      if (typeof this.src === "string") {
        if (this.src.startsWith("/")) this.computer(this.src);
        else if (this.src.startsWith("blob:")) this.computer(this.src);
        else if (re.test(this.src)) this.token(this.src);
        else this.id(this.src);
      } else if (this.src instanceof FileList) this.filelist(this.src);
      else if (this.src instanceof File) this.file(this.src);
    } else {
      this.$el.innerHTML = "";
    }
  }

  make(src: string) {
    const img = document.createElement("img");
    img.src = src;

    this.$el.innerHTML = "";
    this.$el.appendChild(img);
  }

  computer(path: string) {
    this.make(path);
  }

  filelist(file: FileList) {
    const src = URL.createObjectURL(file.item(0) as any);
    this.computer(src);
  }

  file(file: File) {
    const fr = new FileReader();
    fr.onload = () => {
      const src = fr.result as string;
      this.computer(src);
    };

    fr.readAsDataURL(file);
  }

  id(id: string) {
    this.$services.file.get(id).then((data: any) => {
      if (!data) return;
      this.token(data.value.token);
    });
  }

  token(token: string) {
    let url = this.$nuxt.context.$server.baseUrl;
    url = `${url}/file/stream/?ftoken=${token}`;
    this.url(url);
  }

  url(url: string) {
    this.build(url);
  }

  async build(url: RequestInfo) {
    try {
      const blob = await this.getImageBlob(url);
      const src = URL.createObjectURL(blob);
      this.make(src);
    } catch (error) {
      console.error(error);
    }
  }

  async getImageBlob(url: RequestInfo) {
    const i = await window.caches.match(url);
    if (i) return i.blob();

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Image didn't load successfully; error code: ${
          res.statusText || res.status
        }`
      );
    }

    const clone = res.clone();
    const cache = await caches.open("v1");
    if (cache) cache.put(url, clone);

    return res.blob();
  }
}
