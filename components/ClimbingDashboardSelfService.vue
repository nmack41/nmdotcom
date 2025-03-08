<template>
  <div class="dashboard-container">
    <div class="header">
      <h1>Mountain Project Climbing Analysis</h1>
      <p>Track your climbing progress</p>
    </div>
    <div class="input-form" v-if="!dataLoaded">
      <div class="form-card">
        <h3>Enter Your Mountain Project Info</h3>
        <div class="form-group">
          <label for="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            v-model="userId"
            placeholder="e.g. 201253016"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="userName">Username:</label>
          <input
            type="text"
            id="userName"
            v-model="userName"
            placeholder="e.g. nick-mackowski"
            class="form-input"
          />
        </div>
        <button
          @click="loadDashboard"
          class="load-btn"
          :disabled="!userId || !userName || loading"
        >
          {{ loading ? "Loading..." : "Load Dashboard" }}
        </button>
        <div v-if="debugInfo" class="debug-info">
          <p>Debug Info:</p>
          <pre>{{ debugInfo }}</pre>
        </div>
      </div>
      <div class="example-section">
        <p>Need help finding your Mountain Project ID?</p>
        <ol>
          <li>Log into your Mountain Project account</li>
          <li>Go to your profile page</li>
          <li>
            Look at the URL:
            https://www.mountainproject.com/user/[USER-ID]/[USERNAME]
          </li>
        </ol>
      </div>
    </div>

    <div v-if="loading" class="loading-spinner">
      <div class="spinner"></div>
      <p>Loading your climbing data...</p>
    </div>

    <div v-if="error" class="error-message">
      <p>{{ error }}</p>
      <button @click="resetDashboard" class="reset-btn">Try Again</button>
    </div>

    <!-- Dashboard Content -->
    <div v-if="dataLoaded && !loading && !error">
      <div class="dashboard-header">
        <h2>{{ userName }}'s Climbing Stats</h2>
        <button @click="resetDashboard" class="reset-btn">Change User</button>
      </div>

      <div class="stats-container">
        <div class="stat-card">
          <h3>Total Sport Climbs</h3>
          <div class="stat-value">{{ totalClimbs }}</div>
        </div>
        <div class="stat-card">
          <h3>Total Sends</h3>
          <div class="stat-value">{{ totalSends }}</div>
          <div class="stat-note">(Onsight, Flash, Redpoint, Pinkpoint)</div>
        </div>
        <div class="stat-card">
          <h3>Most Common Grade</h3>
          <div class="stat-value">{{ commonGrade }}</div>
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
            <div class="climb-details">
              {{ climb.Rating }} • {{ climb.Date }}
            </div>
          </li>
        </ul>
      </div>
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
      // User input
      userId: "",
      userName: "",

      // Dashboard state
      dataLoaded: false,
      loading: false,
      error: null,
      debugInfo: null,

      // Climbing data
      totalClimbs: "--",
      totalSends: "--",
      commonGrade: "--",
      recentClimbs: [],
      gradeData: [],
      sendGradeData: [],
      showSendsOnly: true,
      timeData: {},

      // Chart objects
      gradeChart: null,
      timeChart: null,
    };
  },
  methods: {
    async loadDashboard() {
      if (!this.userId || !this.userName) {
        this.error = "Please enter both User ID and Username";
        return;
      }

      this.loading = true;
      this.error = null;
      this.debugInfo = null;

      try {
        // Log request parameters for debugging
        console.log(
          `Requesting data for userId: ${this.userId}, userName: ${this.userName}`
        );

        // Fetch data from API endpoint with user parameters
        const response = await axios.get("/api/tick-export-self-service", {
          params: {
            userId: this.userId,
            userName: this.userName,
          },
        });

        // Store raw response for debugging
        console.log("Received response:", response);
        this.debugInfo = `Status: ${
          response.status
        }, Data type: ${typeof response.data}`;

        const data = response.data;

        if (data.error) {
          throw new Error(data.details || data.error);
        }

        // Check if essential data is present
        if (!data.total_climbs && data.total_climbs !== 0) {
          throw new Error("Invalid data format returned from server");
        }

        // Update data properties
        this.totalClimbs = data.total_climbs;
        this.totalSends = data.total_sends;

        this.commonGrade =
          data.send_grades && data.send_grades.length > 0
            ? data.send_grades[0][0]
            : data.grades && data.grades.length > 0
            ? data.grades[0][0]
            : "--";

        this.recentClimbs = data.recent_climbs || [];
        this.gradeData = data.grades || [];
        this.sendGradeData = data.send_grades || [];
        this.timeData = data.climbs_over_time || {};

        this.dataLoaded = true;

        // Wait for DOM to update before creating charts
        this.$nextTick(() => {
          this.createBarChart();
          this.createLineChart();
        });
      } catch (error) {
        console.error("Error loading dashboard data:", error);
        this.error = `Failed to load climbing data: ${error.message}`;
        this.debugInfo = `Error: ${error.toString()}`;
      } finally {
        this.loading = false;
      }
    },

    resetDashboard() {
      // Reset the form and data
      this.userId = "";
      this.userName = "";
      this.dataLoaded = false;
      this.error = null;
      this.debugInfo = null;

      // Clean up charts
      if (this.gradeChart) {
        this.gradeChart.destroy();
        this.gradeChart = null;
      }

      if (this.timeChart) {
        this.timeChart.destroy();
        this.timeChart = null;
      }
    },

    updateGradeChart() {
      if (this.dataLoaded) {
        this.createBarChart();
      }
    },

    createBarChart() {
      if (!this.$refs.gradeChart) {
        console.error("Grade chart reference not found");
        return;
      }

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

      // Log the data for debugging
      console.log("Grade data being rendered:", this.gradeData);
      console.log("Send grades data being rendered:", this.sendGradeData);
      console.log("Show sends only:", this.showSendsOnly);

      const ctx = this.$refs.gradeChart.getContext("2d");

      if (this.gradeChart) {
        this.gradeChart.destroy();
      }

      // Determine which data set to use based on the toggle
      const dataToUse = this.showSendsOnly
        ? this.sendGradeData
        : this.gradeData;

      console.log("Data used for chart:", dataToUse);

      // Convert to lookup object
      const gradeCounts = {};
      dataToUse.forEach(([grade, count]) => {
        gradeCounts[grade] = count;
      });

      // Build ordered array
      const orderedGradeData = GRADE_ORDER.map((grade) => [
        grade,
        gradeCounts[grade] || 0,
      ]);

      console.log("Final ordered data for chart:", orderedGradeData);

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
      if (!this.$refs.timeChart) {
        console.error("Time chart reference not found");
        return;
      }

      const ctx = this.$refs.timeChart.getContext("2d");

      if (this.timeChart) {
        this.timeChart.destroy();
      }

      // Group by year
      const yearCounts = {};
      for (const [dateStr, count] of Object.entries(this.timeData)) {
        if (!dateStr) continue;

        const year = moment(dateStr).isValid()
          ? moment(dateStr).format("YYYY")
          : "Unknown";

        if (!yearCounts[year]) {
          yearCounts[year] = 0;
        }
        yearCounts[year] += count;
      }

      // Sort by year
      const sortedYearData = Object.entries(yearCounts).sort((a, b) =>
        a[0].localeCompare(b[0])
      );

      this.timeChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: sortedYearData.map((item) => item[0]),
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
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.header {
  text-align: center;
  margin-bottom: 30px;
}
.input-form {
  max-width: 600px;
  margin: 0 auto;
}
.form-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 15px;
}
.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}
.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}
.load-btn {
  background-color: #2e86c1;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
}
.load-btn:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
.debug-info {
  margin-top: 15px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
  overflow-x: auto;
}
.example-section {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
}
.example-section ol {
  margin: 10px 0 0 20px;
}
.example-section li {
  margin-bottom: 5px;
}
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
}
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.error-message {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #ffebee;
  border-left: 5px solid #f44336;
  border-radius: 4px;
  text-align: center;
}
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.reset-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
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
</style>
