<template>
  <div class="monthly-calendar-wrapper">
    <div class="my">
      <p>May 2021</p>
    </div>
    <div class="days">
      <div class="day" v-for="day in days" :key="day">
        {{ day }}
      </div>
    </div>
    <div class="weeks">
      <div class="week" v-for="(week, i) in monthDates" :key="i">
        <div
          :class="
            'd' +
            (day.isPlanted ? ' planted' : '') +
            (day.isWatered ? ' watered' : '') +
            (day.isFertilized ? ' fetilized' : '') +
            (day.outOfMonth ? ' oom' : '')
          "
          v-for="day in week"
          :key="day.id"
        >
          {{ day.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MonthlyCalendar",
  data: () => ({
    days: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    monthDates: [],
  }),
  methods: {
    getSunday(d) {
      let e = new Date(d);
      var day = e.getDay(),
          diff = e.getDate() - day; // adjust when day is sunday
      return new Date(e.setDate(diff));
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    getWeekDates(d) {
      let weekTemplate = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      let week = [];
      let wateredAt = this.getRandomInt(7);

      weekTemplate.forEach((v, i) => {
        let sunday = this.getSunday(d);
        let date = new Date(sunday.setDate(sunday.getDate() + i));
        week.push({
          id: i,
          day: v,
          date: date.getDate(),
          outOfMonth: date.getMonth() !== d.getMonth(),
          isWatered: i === wateredAt,
        });
      });

      return week;
    },
    getMonthDates(d) {
      let y = d.getFullYear(),
        m = d.getMonth();
      let firstDay = new Date(y, m, 1);
      let lastDay = new Date(y, m + 1, 0);

      let weeks = [];
      let fdow = [];

      for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
        let date = new Date();
        date.setDate(i);

        let week = this.getWeekDates(date);

        const fd = week[0]["date"];

        if (fdow.includes(fd)) {
          continue;
        }

        fdow.push(fd);
        weeks.push(week);
      }

      return weeks;
    },
  },
  created() {
    // Get month dates
    let monthDates = this.getMonthDates(new Date());
    this.monthDates = monthDates;
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/theme.scss";
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@600;700&display=swap");

.monthly-calendar-wrapper {
  border: 1px solid #f3f3f3;
  border-radius: 20px;
  font-family: $body-font-stack;
  padding: 1rem 0.5rem;
}

.my {
  display: flex;
  justify-content: center;

  p {
    font-weight: 600;
  }
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  column-gap: 0.5rem;

  font-family: "IBM Plex Sans";
  font-weight: 700;
  font-size: 12px;
  color: #a3a3a3;
  letter-spacing: 1.5px;

  .day {
    text-align: center;
  }
}

.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  column-gap: 0.5rem;

  .d {
    text-align: center;
    padding: 0.25rem 0.25rem;

    border-radius: 10px;
    font-weight: 600;
    font-size: 1rem;
    color: #101010;

    margin-top: 0.5rem;

    &.oom {
      filter: opacity(60%);
    }

    &.planted {
      background-color: #fcd46d;
      color: white;
    }

    &.watered {
      background-color: #6a7ee9;
      color: white;
    }

    &.fertilized {
      background-color: #f66161;
      color: white;
    }
  }
}
</style>