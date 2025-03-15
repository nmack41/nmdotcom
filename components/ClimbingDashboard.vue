<template>
  <div class="dashboard-container">
    <div class="header">
      <h1>Mountain Project Climbing Analysis</h1>
      <p>Track your climbing progress based on Mountain Project ticks</p>
    </div>

    <!-- Self-service input form -->
    <div class="input-form" v-if="isSelfService && !dataLoaded">
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
      <div class="dashboard-header" v-if="isSelfService">
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
        <div class="stat-card" v-if="commonGrade">
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

      <div class="locations-container" v-if="popularAreas.length">
        <div class="location-card">
          <h3>Popular Areas</h3>
          <ul class="location-list">
            <li v-for="(area, i) in popularAreas" :key="'area-' + i">
              {{ area[0] }} <span class="count">({{ area[1] }})</span>
            </li>
          </ul>
        </div>
        <div class="location-card">
          <h3>Popular Crags</h3>
          <ul class="location-list">
            <li v-for="(crag, i) in popularCrags" :key="'crag-' + i">
              {{ crag[0] }} <span class="count">({{ crag[1] }})</span>
            </li>
          </ul>
        </div>
        <div class="location-card">
          <h3>Popular Walls</h3>
          <ul class="location-list">
            <li v-for="(wall, i) in popularWalls" :key="'wall-' + i">
              {{ wall[0] }} <span class="count">({{ wall[1] }})</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="climbs-list">
        <h3>Recent Climbs</h3>
        <table class="climbs-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Route</th>
              <th>Rating</th>
              <th>Style</th>
              <th>Area</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(climb, index) in orderedClimbs.slice(0, 10)"
              :key="index"
            >
              <td>{{ climb.Date }}</td>
              <td class="route-name">{{ climb.Route }}</td>
              <td>{{ climb.Rating }}</td>
              <td>{{ climb["Lead Style"] }}</td>
              <td>{{ climb.Area }}</td>
            </tr>
          </tbody>
        </table>
        <div class="view-all-container" v-if="orderedClimbs.length > 10">
          <button @click="showAllClimbs = !showAllClimbs" class="view-all-btn">
            {{ showAllClimbs ? "Show Less" : "View All Climbs" }}
          </button>
        </div>
      </div>

      <div class="all-climbs-table" v-if="showAllClimbs">
        <h3>All Climbs</h3>
        <div class="filter-controls">
          <div class="filter-group">
            <label for="areaFilter">Area:</label>
            <select
              id="areaFilter"
              v-model="filters.area"
              class="filter-select"
            >
              <option value="">All Areas</option>
              <option v-for="area in uniqueAreas" :key="area" :value="area">
                {{ area }}
              </option>
            </select>
          </div>
          <div class="filter-group">
            <label for="gradeFilter">Grade:</label>
            <select
              id="gradeFilter"
              v-model="filters.grade"
              class="filter-select"
            >
              <option value="">All Grades</option>
              <option v-for="grade in uniqueGrades" :key="grade" :value="grade">
                {{ grade }}
              </option>
            </select>
          </div>
          <div class="filter-group">
            <label for="styleFilter">Style:</label>
            <select
              id="styleFilter"
              v-model="filters.style"
              class="filter-select"
            >
              <option value="">All Styles</option>
              <option v-for="style in uniqueStyles" :key="style" :value="style">
                {{ style }}
              </option>
            </select>
          </div>
        </div>

        <table class="climbs-table">
          <thead>
            <tr>
              <th @click="sortBy('Date')">
                Date
                {{ sortKey === "Date" ? (sortOrder === 1 ? "↑" : "↓") : "" }}
              </th>
              <th @click="sortBy('Route')">
                Route
                {{ sortKey === "Route" ? (sortOrder === 1 ? "↑" : "↓") : "" }}
              </th>
              <th @click="sortBy('Rating')">
                Rating
                {{ sortKey === "Rating" ? (sortOrder === 1 ? "↑" : "↓") : "" }}
              </th>
              <th @click="sortBy('Lead Style')">
                Style
                {{
                  sortKey === "Lead Style" ? (sortOrder === 1 ? "↑" : "↓") : ""
                }}
              </th>
              <th @click="sortBy('Area')">
                Area
                {{ sortKey === "Area" ? (sortOrder === 1 ? "↑" : "↓") : "" }}
              </th>
              <th @click="sortBy('Crag')">
                Crag
                {{ sortKey === "Crag" ? (sortOrder === 1 ? "↑" : "↓") : "" }}
              </th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(climb, index) in filteredAndSortedClimbs"
              :key="'all-' + index"
            >
              <td>{{ climb.Date }}</td>
              <td class="route-name">{{ climb.Route }}</td>
              <td>{{ climb.Rating }}</td>
              <td>{{ climb["Lead Style"] }}</td>
              <td>{{ climb.Area }}</td>
              <td>{{ climb.Crag }}</td>
              <td class="notes-cell">{{ climb.Notes }}</td>
            </tr>
          </tbody>
        </table>
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
  props: {
    isSelfService: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // User input (for self-service mode)
      userId: "",
      userName: "",

      // Dashboard state
      dataLoaded: false,
      loading: false,
      error: null,
      showAllClimbs: false,

      // Climbing data
      totalClimbs: "--",
      totalSends: "--",
      commonGrade: "--",
      orderedClimbs: [],
      gradeData: [],
      sendGradeData: [],
      showSendsOnly: true,
      timeData: {},
      popularAreas: [],
      popularCrags: [],
      popularWalls: [],

      // Chart objects
      gradeChart: null,
      timeChart: null,

      // Sorting and filtering
      sortKey: "Date",
      sortOrder: -1, // -1 for descending, 1 for ascending
      filters: {
        area: "",
        grade: "",
        style: "",
      },
    };
  },
  mounted() {
    if (!this.isSelfService) {
      this.fetchDashboardData();
    }
  },
  computed: {
    uniqueAreas() {
      const areas = new Set();
      this.orderedClimbs.forEach((climb) => {
        if (climb.Area) areas.add(climb.Area);
      });
      return [...areas].sort();
    },
    uniqueGrades() {
      const grades = new Set();
      this.orderedClimbs.forEach((climb) => {
        if (climb.Rating) grades.add(climb.Rating);
      });
      return [...grades].sort((a, b) => {
        // Try to sort climbing grades in a logical order
        const aNum = parseFloat(a.replace(/[^\d.]/g, ""));
        const bNum = parseFloat(b.replace(/[^\d.]/g, ""));
        if (!isNaN(aNum) && !isNaN(bNum)) {
          if (aNum !== bNum) return aNum - bNum;
        }
        return a.localeCompare(b);
      });
    },
    uniqueStyles() {
      const styles = new Set();
      this.orderedClimbs.forEach((climb) => {
        if (climb["Lead Style"]) styles.add(climb["Lead Style"]);
      });
      return [...styles].sort();
    },
    filteredAndSortedClimbs() {
      return this.orderedClimbs
        .filter((climb) => {
          const areaMatch =
            !this.filters.area || climb.Area === this.filters.area;
          const gradeMatch =
            !this.filters.grade || climb.Rating === this.filters.grade;
          const styleMatch =
            !this.filters.style || climb["Lead Style"] === this.filters.style;
          return areaMatch && gradeMatch && styleMatch;
        })
        .sort((a, b) => {
          const valA = a[this.sortKey];
          const valB = b[this.sortKey];

          // Handle date sorting specially
          if (this.sortKey === "Date") {
            return this.sortOrder * (new Date(valB) - new Date(valA));
          }

          // Handle string sorting
          if (typeof valA === "string" && typeof valB === "string") {
            return this.sortOrder * valA.localeCompare(valB);
          }

          // Handle numeric sorting
          return this.sortOrder * (valA - valB);
        });
    },
  },
  methods: {
    loadDashboard() {
      if (!this.userId || !this.userName) {
        this.error = "Please enter both User ID and Username";
        return;
      }

      this.loading = true;
      this.error = null;

      this.fetchDashboardData(true);
    },

    resetDashboard() {
      this.userId = "";
      this.userName = "";
      this.dataLoaded = false;
      this.error = null;

      // Clean up charts
      if (this.gradeChart) {
        this.gradeChart.destroy();
        this.gradeChart = null;
      }
      if (this.timeChart) {
        this.timeChart.destroy();
        this.timeChart = null;
      }

      // Reset data
      this.orderedClimbs = [];
      this.gradeData = [];
      this.sendGradeData = [];
      this.timeData = {};
      this.popularAreas = [];
      this.popularCrags = [];
      this.popularWalls = [];

      // Reset filters
      Object.keys(this.filters).forEach((key) => {
        this.filters[key] = "";
      });

      // Reset sorting
      this.sortKey = "Date";
      this.sortOrder = -1;

      // Reset view state
      this.showAllClimbs = false;
    },

    async fetchDashboardData(selfService = false) {
      try {
        this.loading = true;

        let response;
        if (selfService) {
          response = await axios.get("/api/tick-export", {
            params: {
              userId: this.userId,
              userName: this.userName,
            },
          });
        } else {
          response = await axios.get("/api/tick-export");
        }

        const data = response.data;

        // Set dashboard data
        this.totalClimbs = data.total_climbs;
        this.totalSends = data.total_sends;
        this.commonGrade =
          data.send_grades && data.send_grades.length > 0
            ? data.send_grades[0][0]
            : data.grades && data.grades.length > 0
            ? data.grades[0][0]
            : "";

        // Process climb data
        this.orderedClimbs = data.all_climbs || data.ordered_climbs || [];
        this.gradeData = data.grades || [];
        this.sendGradeData = data.send_grades || [];
        this.timeData = data.climbs_over_time || {};

        // Set location data
        this.popularAreas = data.popular_areas || [];
        this.popularCrags = data.popular_crags || [];
        this.popularWalls = data.popular_walls || [];

        this.dataLoaded = true;

        // Wait for DOM to update before creating charts
        this.$nextTick(() => {
          this.createBarChart();
          this.createLineChart();
        });
      } catch (error) {
        this.error = "Failed to load climbing data. Please try again later.";
      } finally {
        this.loading = false;
      }
    },

    sortBy(key) {
      // If clicking the same column, toggle sort order
      if (this.sortKey === key) {
        this.sortOrder = -this.sortOrder;
      } else {
        // New column, set as sort key with default descending order
        this.sortKey = key;
        this.sortOrder = -1;
      }
    },

    updateGradeChart() {
      this.createBarChart();
    },

    createBarChart() {
      if (!this.$refs.gradeChart) {
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

      const ctx = this.$refs.gradeChart.getContext("2d");

      if (this.gradeChart) {
        this.gradeChart.destroy();
      }

      const dataToUse = this.showSendsOnly
        ? this.sendGradeData
        : this.gradeData;

      const gradeCounts = {};
      dataToUse.forEach(([grade, count]) => {
        gradeCounts[grade] = count;
      });

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
      if (!this.$refs.timeChart) {
        return;
      }

      const ctx = this.$refs.timeChart.getContext("2d");

      if (this.timeChart) {
        this.timeChart.destroy();
      }

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

.header h1 {
  color: #2c3e50;
  margin-bottom: 5px;
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
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1;
  min-width: 200px;
  max-width: 300px;
  text-align: center;
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
  gap: 20px;
  margin-bottom: 30px;
}

.chart-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1;
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

.locations-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
}

.location-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex: 1;
  min-width: 250px;
}

.location-card h3 {
  margin-top: 0;
  color: #555;
  margin-bottom: 15px;
}

.location-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.location-list li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.location-list li:last-child {
  border-bottom: none;
}

.count {
  color: #777;
  font-size: 14px;
}

.climbs-list {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 30px;
}

.climbs-list h3 {
  margin-top: 0;
  color: #555;
  margin-bottom: 15px;
}

.climbs-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}

.climbs-table th {
  background-color: #f5f5f5;
  text-align: left;
  padding: 10px;
  cursor: pointer;
}

.climbs-table th:hover {
  background-color: #e9e9e9;
}

.climbs-table td {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.route-name {
  font-weight: 500;
}

.notes-cell {
  max-width: 200px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}

.view-all-container {
  text-align: center;
  margin-top: 15px;
}

.view-all-btn {
  background-color: #2e86c1;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}

.all-climbs-table {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 30px;
}

.all-climbs-table h3 {
  margin-top: 0;
  color: #555;
  margin-bottom: 15px;
}

.filter-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 150px;
}

.filter-group label {
  margin-bottom: 5px;
  font-weight: 500;
}

.filter-select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

@media (max-width: 768px) {
  .chart-card,
  .stat-card,
  .location-card {
    min-width: 100%;
  }

  .filter-group {
    width: 100%;
  }

  .climbs-table {
    font-size: 14px;
  }

  .notes-cell {
    max-width: 100px;
  }
}
</style>
