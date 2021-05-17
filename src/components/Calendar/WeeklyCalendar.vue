<template>
  <div class="weekly-calendar-wrapper">
    <div class="my">
      <p>May 2021</p>
    </div>
    <div class="week">
      <div
        :class="
          'dd' +
          (day.isPlanted ? ' planted' : '') +
          (day.isWatered ? ' watered' : '') +
          (day.isFertilized ? ' fetilized' : '') +
          (day.outOfMonth ? ' oom' : '')
        "
        v-for="day in week"
        :key="day.id"
      >
        <div class="day">
          {{ day.day }}
        </div>
        <div class="date">
          {{ day.date }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeeklyCalendar",
  data: () => ({
    week: [],
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

      weekTemplate.forEach((v, i) => {
        let sunday = this.getSunday(d);
        let date = new Date(sunday.setDate(sunday.getDate() + i));
        week.push({
          id: i,
          day: v,
          outOfMonth: date.getMonth() !== d.getMonth(),
          date: date.getDate(),
        });
      });

      return week;
    },
    getMonthDates(d) {
      let date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
      let firstDay = new Date(y, m, 1);
      let lastDay = new Date(y, m + 1, 0);

      let weeks = [];
      let fdow = [];

      for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
        let date = new Date();
        date.setDate(i);

        let week = this.getWeekDates(date);

        const fd = week[0]["date"];
        console.log(i, fdow.length);
        console.log(fd, fdow.includes(fd));

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
    let weekDates = this.getWeekDates(new Date("2021/05/01"));

    let plantedAt = this.getRandomInt(7);
    let wateredAt = plantedAt + 1;

    weekDates.forEach((v, i) => {
      this.week.push({
        id: v.id,
        day: v.day,
        date: v.date,
        outOfMonth: v.outOfMonth,
        isPlanted: i === plantedAt,
        isWatered: i === wateredAt,
      });
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/theme.scss";
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@600;700&display=swap");

.weekly-calendar-wrapper {
  border: 1px solid #f3f3f3;
  border-radius: 20px;

  font-family: $body-font-stack;

  padding: 1rem 0.5rem;
}

.my {
  display: flex;
  justify-content: flex-end;

  p {
    font-weight: 600;
    margin-top: .5rem;
    margin-bottom: 0.5rem;
  }
}

.week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  column-gap: 0.15rem;

  font-family: "IBM Plex Sans";

  .dd {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0.25rem;
    border-radius: 10px;

    .day {
      font-weight: 700;
      font-size: 12px;
      color: #a3a3a3;
      letter-spacing: 1.5px;
    }

    .date {
      font-weight: 600;
      font-size: 1rem;
      color: #101010;

      margin-top: 0.5rem;
    }

    &.oom {
      filter: opacity(60%);
    }

    &.planted {
      background-color: #fcd46d;

      * {
        color: white;
      }
    }

    &.watered {
      background-color: #6a7ee9;

      * {
        color: white;
      }
    }

    &.fertilized {
      background-color: #f66161;

      * {
        color: white;
      }
    }
  }
}
</style>