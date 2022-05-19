<template>
  <n-dropper ref="dropper">
    <n-input
      slot="button"
      :value="value"
      :error="error"
      :placeholder="placeholder"
      :success="success"
    >
      <slot slot="left" name="left" />

      <div v-if="is_value_array" class="text">
        <div class="group">
          <button
            v-for="(option, o) in value_inputer0"
            :key="o"
            @click.stop="on_option_click(option.value)"
          >
            <i v-if="option.icon" :class="option.icon"></i>
            <div>{{ option.text }}</div>
          </button>
        </div>
      </div>
      <div v-else class="input">
        <div
          v-if="value_inputer0.length"
          style="display: flex; align-items: center"
        >
          <div
            v-if="value_inputer0[0].icon"
            style="margin-right: 10px"
            v-html="value_inputer0[0].icon"
          ></div>
          <div>{{ value_inputer0[0].text }}</div>
        </div>
      </div>

      <input
        :value="value_inputer0"
        :required="required"
        readonly
        style="
          width: 100%;
          height: 100%;
          padding: 0;
          border: 0;
          resize: none;
          background: transaprent;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          z-index: -1;
        "
      />

      <!-- <slot slot="right" name="right" /> -->
      <i slot="right" style="font-size: 10px" class="fi fi-sr-angle-down"></i>
    </n-input>
    <div>
      <button
        v-for="(option, o) in options"
        :key="o"
        type="button"
        class="options"
        :class="{ select: value_array.includes(option.value) }"
        @click="on_option_click(option.value)"
      >
        <div class="index"></div>
        <div
          v-if="option.icon"
          style="margin-right: 10px"
          v-html="option.icon"
        ></div>
        <div>{{ option.text }}</div>
      </button>
    </div>
  </n-dropper>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop()
  value!: any;

  @Prop({ type: Array, default: () => [] })
  options!: { text: string; icon: string; value: any }[];

  @Prop({ type: Boolean, default: false })
  required!: boolean;

  @Prop({ type: String })
  placeholder!: string;

  @Prop({ type: [String, Boolean], default: false })
  error!: string | boolean;

  @Prop({ type: [String, Boolean], default: false })
  success!: string | boolean;

  get is_value_array() {
    return Array.isArray(this.value);
  }

  get value_array() {
    return this.is_value_array ? this.value : [this.value];
  }

  get value_inputer0() {
    const value = this.value_array;
    const options = this.options.filter((opt) => value.includes(opt.value));

    return options;
  }

  mounted() {
    this.init();
  }

  init() {}

  on_option_click(value: any) {
    if (Array.isArray(this.value)) {
      let values = this.value;
      const i = values.includes(value);

      if (i) values = values.filter((v) => v !== value);
      else values.push(value);

      this.$emit("input", values);
    } else {
      this.$emit("input", value);

      const dropper = this.$refs.dropper as any;
      dropper.closer();
    }
  }
}
</script>

<style lang="scss" scoped>
.group {
  display: flex;
  flex-wrap: wrap;

  button {
    border: 1px solid rgba(var(--dark), 0.07);
    border-radius: 0.6em;
    margin-right: 2px;
    margin-bottom: 2px;
    font-size: 12px;
    background-color: rgba(var(--dark), 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    line-height: 1;
    padding: 3px 5px;

    i {
      margin-right: 5px;
    }

    &:hover {
      background-color: rgba(var(--primary), 0.5);
      color: rgba(var(--white), 1);
    }
  }
}
.options {
  display: flex;
  width: 100%;
  border: 0;
  outline: none;
  height: 42px;
  background-color: transparent;
  display: flex;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;
  line-height: 1;

  .index {
    width: 8px;
    height: 8px;
    margin-right: 10px;
    border-radius: 0.4em;
    background-color: rgba(var(--dark), 0.1);
  }

  &.select {
    .index {
      background-color: rgba(var(--success), 1);
    }
  }

  &:hover {
    background-color: rgba(var(--primary), 1);

    * {
      color: rgba(var(--white), 1);
    }
  }
}
</style>
