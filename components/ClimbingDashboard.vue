<template>
  <div class="dashboard-container">
    <div class="header">
      <h1><b>Climbing Journey</b></h1>
      <p>
        Tracking progress one clip at a time based on Mountain Project ticks
      </p>
    </div>

    <div class="stats-container">
      <div class="stat-card">
        <h3>Total Sport Climbs</h3>
        <div class="stat-value">{{ totalClimbs }}</div>
      </div>
      <div class="stat-card">
        <h3>Total Sends</h3>
        <div class="stat-value">{{ totalSends }}</div>
      </div>
    </div>

    <div class="chart-container">
      <div class="chart-card">
        <div class="chart-header">
          <h3>Climbs by Grade</h3>
          <div class="toggle-container">
            <label class="toggle">
              <input
                type="checkbox"
                v-model="showSendsOnly"
                @change="updateGradeChart"
              />
              <span class="toggle-label">Sends Only</span>
            </label>
          </div>
        </div>
        <canvas ref="gradeChart"></canvas>
      </div>
      <div class="chart-card">
        <h3>Progress Over Time</h3>
        <canvas ref="timeChart"></canvas>
      </div>
    </div>

    <div class="recent-climbs">
      <h3>Recent Sport Climbs</h3>
      <ul class="climb-list">
        <li
          v-for="(climb, index) in recentClimbs"
          :key="index"
          class="climb-item"
        >
          <div class="climb-name">{{ climb.Route }}</div>
          <div class="climb-details">{{ climb.Rating }} • {{ climb.Date }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import moment from "moment";
import axios from "axios";

export default {
  name: "ClimbingDashboard",
  data() {
    return {
      totalClimbs: "--",
      totalSends: "--",
      commonGrade: "--",
      recentClimbs: [],
      gradeData: [],
      sendGradeData: [],
      showSendsOnly: true,
      timeData: {},
      gradeChart: null,
      timeChart: null,
    };
  },
  mounted() {
    this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      try {
        // 1. Fetch data from the server-side API endpoint that returns parsed climbing data
        const response = await axios.get("/api/tick-export");
        const data = response.data;

        // 2. Update data properties based on the API response
        this.totalClimbs = data.total_climbs;
        this.totalSends = data.total_sends;

        // Set common grade based on send grades if available
        this.commonGrade =
          data.send_grades && data.send_grades.length > 0
            ? data.send_grades[0][0]
            : data.grades && data.grades.length > 0
            ? data.grades[0][0]
            : "--";

        this.recentClimbs = data.recent_climbs;

        // Store both all attempts and sends-only grade data
        this.gradeData = data.grades || [];
        this.sendGradeData = data.send_grades || [];
        this.timeData = data.climbs_over_time || {};

        // 3. Create charts after data is loaded
        this.createBarChart();
        this.createLineChart();
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    },

    updateGradeChart() {
      this.createBarChart();
    },

    createBarChart() {
      // Define the exact order of grades you want to show
      const GRADE_ORDER = [
        "5.6",
        "5.7",
        "5.8",
        "5.9",
        "5.10a",
        "5.10b",
        "5.10c",
        "5.10d",
        "5.11a",
        "5.11b",
        "5.11c",
        "5.11d",
        "5.12a",
        "5.12b",
        "5.12c",
        "5.12d",
        "5.13a",
        "5.13b",
        "5.13c",
        "5.13d",
      ];

      const ctx = this.$refs.gradeChart.getContext("2d");

      // Destroy any existing chart instance before creating a new one
      if (this.gradeChart) {
        this.gradeChart.destroy();
      }

      // Determine which data set to use based on the toggle
      const dataToUse = this.showSendsOnly
        ? this.sendGradeData
        : this.gradeData;

      // Convert the array [ [grade, count], ... ] into a lookup object for quick access
      const gradeCounts = {};
      dataToUse.forEach(([grade, count]) => {
        gradeCounts[grade] = count;
      });

      // Build a new array that follows the GRADE_ORDER exactly
      // If a grade doesn't appear in the data, use 0 as its count
      const orderedGradeData = GRADE_ORDER.map((grade) => [
        grade,
        gradeCounts[grade] || 0,
      ]);

      this.gradeChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: orderedGradeData.map((item) => item[0]),
          datasets: [
            {
              label: "Climbs by Grade",
              data: orderedGradeData.map((item) => item[1]),
              backgroundColor: this.showSendsOnly ? "#2ECC71" : "#3498DB",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },

    createLineChart() {
      const ctx = this.$refs.timeChart.getContext("2d");

      // Destroy any existing chart instance
      if (this.timeChart) {
        this.timeChart.destroy();
      }

      // Group climbs by year rather than by exact month
      // 1. Build an object like { '2024': totalClimbsIn2024, '2025': totalClimbsIn2025, ... }
      const yearCounts = {};
      for (const [dateStr, count] of Object.entries(this.timeData)) {
        const year = moment(dateStr).format("YYYY");
        if (!yearCounts[year]) {
          yearCounts[year] = 0;
        }
        yearCounts[year] += count;
      }

      // 2. Convert that object into a sorted array of [year, count]
      //    so that older years appear first
      const sortedYearData = Object.entries(yearCounts).sort((a, b) =>
        a[0].localeCompare(b[0])
      );

      // 3. Create the line chart with years on the x-axis
      this.timeChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: sortedYearData.map((item) => item[0]), // just the year
          datasets: [
            {
              label: "Number of Climbs",
              data: sortedYearData.map((item) => item[1]),
              fill: false,
              borderColor: "#2E86C1",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.header {
  text-align: center;
  margin-bottom: 30px;
}
.stats-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}
.stat-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  flex: 1;
  min-width: 200px;
  max-width: 300px;
  margin: 10px;
}
.stat-card h3 {
  margin-top: 0;
  color: #555;
  font-size: 16px;
}
.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #2e86c1;
}
.stat-note {
  font-size: 12px;
  color: #777;
  margin-top: 5px;
}
.chart-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 30px;
}
.chart-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  width: calc(50% - 20px);
  min-width: 300px;
  min-height: 300px;
}
.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}
.chart-card h3 {
  margin-top: 0;
  color: #555;
}
.toggle-container {
  display: flex;
  align-items: center;
}
.toggle {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}
.toggle input {
  margin-right: 8px;
}
.toggle-label {
  font-size: 14px;
  color: #555;
}
.recent-climbs {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}
.recent-climbs h3 {
  margin-top: 0;
  color: #555;
}
.climb-list {
  list-style-type: none;
  padding: 0;
}
.climb-item {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.climb-name {
  font-weight: bold;
}
.climb-details {
  color: #777;
  font-size: 14px;
}
@media (max-width: 768px) {
  .chart-card {
    width: 100%;
  }
}
</style>
