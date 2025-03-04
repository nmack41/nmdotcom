import Papa from "papaparse";

export default defineEventHandler(async (event) => {
  // Update this URL to your Mountain Project tick-export page
  const url =
    "https://www.mountainproject.com/user/201253016/nick-mackowski/tick-export";
  try {
    // 1. Fetch the raw CSV
    const csvText = await $fetch(url);

    // 2. Parse CSV into an array of objects
    //    e.g. [{Date: "2024-11-09", Route: "Robotic Thumb", Rating: "5.10b", ...}, ...]
    const parsed = Papa.parse(csvText, { header: true, dynamicTyping: true });

    // Filter out any empty rows
    const rows = parsed.data.filter(
      (row) => row.Date && row.Route && row.Rating
    );

    // 3. total_climbs
    const total_climbs = rows.length;

    // 3b. total_sends (Onsight, Flash, or Redpoint)
    const sendStyles = ["Onsight", "Flash", "Redpoint"];
    const total_sends = rows.filter((row) =>
      sendStyles.includes(row["Lead Style"])
    ).length;

    // 3c. Filter rows by send style for grade analysis
    const send_rows = rows.filter((row) =>
      sendStyles.includes(row["Lead Style"])
    );

    // 4. grades (count how many times each grade appears)
    const gradeCounts = {};
    rows.forEach((row) => {
      if (!gradeCounts[row.Rating]) gradeCounts[row.Rating] = 0;
      gradeCounts[row.Rating]++;
    });
    // Turn { "5.10b": 3, "5.12a": 1 } into [ ["5.10b", 3], ["5.12a", 1] ], sorted by frequency
    const gradesArray = Object.entries(gradeCounts).sort((a, b) => b[1] - a[1]);

    // Sends only grade counts
    const sendGradeCounts = {};
    send_rows.forEach((row) => {
      if (!sendGradeCounts[row.Rating]) sendGradeCounts[row.Rating] = 0;
      sendGradeCounts[row.Rating]++;
    });

    // Turn into sorted array
    const sendGradesArray = Object.entries(sendGradeCounts).sort(
      (a, b) => b[1] - a[1]
    );

    // 5. recent_climbs: sort by date descending and take the first 5
    //    (Assumes your Date column is formatted like YYYY-MM-DD)
    rows.sort((a, b) => new Date(b.Date) - new Date(a.Date));
    const recent_climbs = rows.slice(0, 5);

    // 6. climbs_over_time: group by exact date (or by month if you prefer)
    const climbs_over_time = {};
    rows.forEach((row) => {
      if (!climbs_over_time[row.Date]) climbs_over_time[row.Date] = 0;
      climbs_over_time[row.Date]++;
    });

    // 7. Return the final object your dashboard expects
    return {
      total_climbs,
      total_sends,
      grades: gradesArray,
      send_grades: sendGradesArray,
      recent_climbs,
      climbs_over_time,
    };
  } catch (error) {
    return { error: "Failed to fetch data", details: error.message };
  }
});
