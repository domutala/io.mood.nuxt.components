<template>
  <div class="ndate">
    <div class="header">
      <button @click="go_next_or_prev_month(-1)">
        <n2-svg svg="chevron-left" />
      </button>
      <div class="current" @click="open_selecter = true">
        {{ months[month] }}
        {{ year }}
      </div>
      <button @click="go_next_or_prev_month(1)">
        <n2-svg svg="chevron-right" />
      </button>
    </div>
    <div class="group" :style="{ width: `${carret * 7}px` }">
      <div
        v-for="day in weekdays"
        :key="day"
        class="day name"
        :style="{ width: `${carret}px`, height: `${carret}px` }"
      >
        {{ day[0] }}
      </div>
    </div>

    <div
      ref="content"
      class="content"
      :style="{ width: `${carret * 7}px`, height: `${carret * 6}px` }"
    >
      <div
        ref="container"
        class="container"
        :style="{
          left: `${-(carret * 7) + drag_dist}px`,
          transitionDuration: `${transition_duration}s`,
        }"
      >
        <div v-for="(pack, p) in dates_packets" :key="p">
          <div class="group" :style="{ width: `${carret * 7}px` }">
            <div
              v-for="(date, d) in pack"
              :key="d"
              class="day"
              :class="{
                disable: date.month_position !== 'current',
                is_today: date.is_today,
                is_current: date.is_current,
              }"
              :style="{ width: `${carret}px`, height: `${carret}px` }"
              @click="submit(date)"
            >
              {{ date.date.date() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import moment, { weekdays, months } from "moment";
import { Component, Prop, Watch } from "vue-property-decorator";
import Base from "../base";

type MyDate = {
  date: moment.Moment;
  month_position: "next" | "current" | "prev";
  is_today: boolean;
  is_current: boolean;
};

@Component
export default class NDateBase extends Base {
  @Prop({ type: Date, default: () => moment().toDate() })
  value!: Date;

  month = 0;
  year = 0;

  month_selecter = 0;
  year_selecter = 0;

  months2: number[][] = [];
  years2: number[][] = [];

  dates: MyDate[] = [];
  dates_next: MyDate[] = [];
  dates_prev: MyDate[] = [];

  carret = 36;
  transition_duration = 0.5;
  drag_dist = 0;
  working = false;
  open_selecter = false;

  sens: "next" | "prev" = "next";
  dragStarted = false;
  dragStartTo = 0;
  dragDist = 0;

  get weekdays() {
    return weekdays();
  }

  get months() {
    return months();
  }

  get dates_packets() {
    return [this.dates_prev, this.dates, this.dates_next];
  }

  mounted() {
    this.start();
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.build_graph);
  }

  start() {
    this.build_graph();
    window.addEventListener("resize", this.build_graph);

    this.build0(moment(this.value));
    this.startDrag();
  }

  submit(mydate: MyDate) {
    if (mydate.month_position !== "current") return;

    const date = mydate.date.clone();
    this.$emit("input", date.toDate());
  }

  @Watch("value")
  on_date() {
    this.build0(moment(this.value));
  }

  build_graph() {
    this.carret = 36;
    const parent = this.$el.parentElement;

    this.months2 = [];

    if (parent) {
      this.carret = parent.offsetWidth / 7;
    }
  }

  build0(date: moment.Moment) {
    this.dates = this.build(date);

    this.month_selecter = this.month = date.month();
    this.year_selecter = this.year = date.year();

    // this.req_scroll_selecter();
  }

  build(date: moment.Moment) {
    const today = moment();
    const dates: MyDate[] = [];

    const push_in_dates = (
      z: moment.Moment,
      month_position: "next" | "current" | "prev"
    ) => {
      dates[month_position === "prev" ? "unshift" : "push"]({
        date: z,
        month_position,
        is_today: z.isSame(today, "days"),
        is_current: moment(this.value).isSame(z, "days"),
      });
    };

    let d = 1;
    while (d !== date.date()) {
      const clone = date.clone();
      const k = clone.subtract(date.date() - d, "days").format("YYYY-MM-DD");

      const z = moment(k);
      push_in_dates(z, "current");

      d++;
    }

    let e = date.date();
    while (e <= date.daysInMonth()) {
      const clone = date.clone();
      const k = clone.add(e - date.date(), "days").format("YYYY-MM-DD");

      const z = moment(k);
      push_in_dates(z, "current");

      e++;
    }

    const first = dates[0].date.clone();
    let f = first.day();
    while (f > 0) {
      const clone = first.clone();
      const k = clone
        .subtract(first.day() - f + 1, "days")
        .format("YYYY-MM-DD");

      const z = moment(k);
      push_in_dates(z, "prev");

      f--;
    }

    while (dates.length !== 42) {
      const clone = dates[dates.length - 1].date.clone();
      const k = clone.add(1, "days").format("YYYY-MM-DD");

      const z = moment(k);
      push_in_dates(z, "next");
    }

    // const last = dates[dates.length - 1].date.clone();
    // let g = last.day() + 1;
    // let h = 1;
    // while (g <= 6) {
    //   const clone = last.clone();
    //   const k = clone.add(h, "days").format("YYYY-MM-DD");

    //   const z = moment(k);
    //   push_in_dates(z, "next");

    //   g++;
    //   h++;
    // }

    return dates;
  }

  @Watch("dates", { deep: true })
  on_date_current_build() {
    let i = 0;
    let c = "";

    while (c !== "current") {
      c = this.dates[i].month_position;
      if (c !== "current") i++;
    }

    const date = this.dates[i].date.clone();

    let k = date.clone().add(1, "months").format("YYYY-MM-DD");
    this.dates_next = this.build(moment(k));

    k = date.clone().subtract(1, "months").format("YYYY-MM-DD");
    this.dates_prev = this.build(moment(k));
  }

  go_next_or_prev_month(sens: 1 | -1) {
    if (this.working) return;

    this.working = true;
    const t = this.carret * 7 * -sens;

    this.transition_duration = 0.5;
    this.drag_dist = t;

    setTimeout(() => {
      this.transition_duration = 0;

      let i = 0;
      let c = "";

      while (c !== "current") {
        c = this.dates[i].month_position;
        if (c !== "current") i++;
      }

      let date = this.dates[i].date.clone();
      let k = date.format("YYYY-MM-DD");
      date = moment(k);

      // current month
      k = date[sens === 1 ? "add" : "subtract"](1, "month").format(
        "YYYY-MM-DD"
      );
      date = moment(k);
      this.build0(date);

      this.working = false;
      this.drag_dist = 0;
    }, 500);
  }

  select_scroller(select_name: string, sens: -1 | 1) {
    const selecter = this.$refs[select_name] as HTMLDivElement;
    selecter.scrollTo({
      top: selecter.scrollTop + 32 * sens,
      behavior: "smooth",
    });
  }

  req_scroll_selecter() {
    const monthSelecter = this.$refs.monthSelecter as HTMLDivElement;
    const im = this.months2.findIndex((mt2) => mt2.includes(this.month));
    monthSelecter.scrollTo({ top: im * 32, behavior: "smooth" });

    const yearSelecter = this.$refs.yearSelecter as HTMLDivElement;
    const iy = this.years2.findIndex((iy2) => iy2.includes(this.year));
    yearSelecter.scrollTo({ top: iy * 32, behavior: "smooth" });
  }

  valid_selecter() {
    this.open_selecter = false;
    const k = `${this.year_selecter}-${this.year_selecter > 8 ? "" : 0}${
      this.month_selecter + 1
    }-01`;

    this.build0(moment(k));
  }

  // drag
  startDrag() {
    const content = this.$refs.content as HTMLDivElement;
    content.addEventListener("mousedown", this.onDragStart);
    content.addEventListener("mousemove", this.onDrag);
    window.addEventListener("mouseup", this.onDragEnd);

    content.addEventListener("touchstart", this.onDragStart);
    content.addEventListener("touchmove", this.onDrag);
    window.addEventListener("touchend", this.onDragEnd);
  }

  onDragStart(e: MouseEvent | TouchEvent) {
    if (this.dragStarted) return;

    const x = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
    this.dragStarted = true;
    this.dragStartTo = x;
  }

  onDrag(e: MouseEvent | TouchEvent) {
    if (!this.dragStarted) return;
    e.preventDefault();

    const x = e instanceof MouseEvent ? e.pageX : e.touches[0].pageX;
    const dist = x - this.dragStartTo;

    if (Math.abs(dist) <= this.carret * 7) {
      this.drag_dist = dist * 0.7;
    }
  }

  onDragEnd() {
    if (!this.dragStarted) return;

    this.dragStarted = false;
    this.dragStartTo = 0;

    if (Math.abs(this.drag_dist) > this.carret * 2) {
      const sens = this.drag_dist > 0 ? -1 : 1;
      this.go_next_or_prev_month(sens);
    } else {
      this.transition_duration = 0.5;
      this.drag_dist = 0;
      setTimeout(() => {
        this.transition_duration = 0;
      }, 500);
    }
  }
}
</script>

<style lang="scss" scoped>
.ndate {
  position: relative;
  user-select: none;
  overflow: hidden;

  .calc {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    background-color: rgba(var(--light), 0.3);
  }

  .selecter {
    position: absolute;
    bottom: -100px;
    left: 0;
    width: 100%;
    z-index: 10;
    transition: all 0.5s ease;
    background-color: rgba(var(--light), 1);
    // background-color: green;

    > div {
      &.top {
        height: 32px;
        text-align: center;
        border-bottom: 1px solid rgba(var(--dark), 0.04);
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 20px;

        > div {
          cursor: pointer;
          margin-left: 5px;
          margin-right: 5px;
          &:hover {
            text-decoration: underline dotted;
          }
        }
      }

      &.bottom {
        display: flex;
        align-items: center;
        overflow: hidden;

        // &:not(:last-child) {
        //   border-bottom: 1px solid rgba(var(--dark), 0.04);
        // }

        .tonav {
          position: relative;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          z-index: 1;
          right: 0;
          background-color: rgba(var(--light), 1);
          // display: none;

          &::before {
            content: "";
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            border-left: 1px solid rgba(var(--dark), 0.05);
          }

          button {
            display: flex;
            align-items: center;
            justify-content: center;
            border: 0;
            padding: 0;
            width: 32px;
            height: 16px;
            cursor: pointer;
            background-color: transparent;

            &:hover {
              background-color: rgba(var(--dark), 0.1);
            }
          }
        }

        .toscroll {
          width: calc(100% - 32px);
          height: 32px;
          overflow: auto;

          > div {
            display: flex;
            justify-content: center;

            > div {
              button {
                width: 70px;
                height: 32px;
                border: 0;
                padding: 0;
                background-color: transparent;
                cursor: pointer;
                opacity: 0.5;
                display: flex;
                align-items: center;
                justify-content: center;

                &.yr {
                  width: 45px;
                }

                &.current {
                  opacity: 1;
                }

                &:hover {
                  color: rgba(var(--primary), 1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }

    &.open {
      bottom: 0;
      box-shadow: rgba(var(--dark), 0.2) 0px 7px 29px 0px;
    }
  }

  .header {
    display: flex;
    align-items: center;
    height: 70px;
    border-bottom: 1px solid rgba(var(--dark), 0.05);
    position: sticky;
    top: 0;
    background-color: rgba(var(--light), 1);
    z-index: 5;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      margin: 5px;
      padding: 0;
      width: 24px;
      height: 24px;
      border-radius: 100%;
      cursor: pointer;
      background-color: transparent;

      i {
        font-size: 10px;
      }

      &:hover {
        background-color: rgba(var(--dark), 0.1);
      }
    }

    .current {
      margin: auto;
      cursor: pointer;

      &:hover {
        text-decoration: underline dotted;
      }
    }
  }

  .content {
    position: relative;
    overflow: hidden;
    user-select: none;

    .container {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      transition: all ease;

      > div:nth-child(2) {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        z-index: 1;
      }
    }
  }

  .group {
    display: flex;
    flex-wrap: wrap;

    .day {
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.5;
      cursor: default;
      position: relative;
      border-radius: 0.6em;

      &.name {
        opacity: 1;
        font-size: 85%;
      }

      &:not(.name) {
        &::after {
          content: "";
          position: absolute;
          bottom: 3px;
          left: 3px;
          right: 3px;
          top: 3px;
          border-radius: 0.6em;
        }

        &.is_today {
          &::before {
            content: "";
            position: absolute;
            bottom: 3px;
            left: 50%;
            transform: translateX(-50%);
            width: 5px;
            height: 5px;
            border-radius: 100%;
            background-color: rgba(var(--primary), 1);
          }
        }

        &.is_current {
          &::after {
            border: 1px solid rgba(var(--primary), 1);
          }
        }
      }

      &:not(.disable) {
        &:not(.name) {
          opacity: 1;
          cursor: pointer;

          &:hover {
            &::after {
              background-color: rgba(var(--primary), 0.1);
            }
          }
        }
      }
    }
  }
}
</style>
