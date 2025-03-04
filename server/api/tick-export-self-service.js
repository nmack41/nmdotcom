import Papa from "papaparse";

export default defineEventHandler(async (event) => {
  // Get user parameters from query
  const query = getQuery(event);
  const userId = query.userId;
  const userName = query.userName;

  // Validate required parameters
  if (!userId || !userName) {
    return {
      error: "Missing required parameters",
      details: "Both userId and userName are required",
    };
  }

  // Construct the Mountain Project tick-export URL
  const url = `https://www.mountainproject.com/user/${userId}/${userName}/tick-export`;

  try {
    // 1. Fetch the raw CSV
    const csvText = await $fetch(url);

    // Basic validation - if not CSV, MP returns HTML instead
    if (csvText.includes("<!DOCTYPE html>") || csvText.includes("<html>")) {
      return {
        error: "Invalid user data",
        details:
          "Could not retrieve climbing data. Please check your User ID and Username.",
      };
    }

    // 2. Parse CSV into an array of objects
    const parsed = Papa.parse(csvText, { header: true, dynamicTyping: true });

    // Filter out any empty rows
    const rows = parsed.data.filter(
      (row) => row.Date && row.Route && row.Rating
    );

    // If no valid rows found
    if (!rows.length) {
      return {
        error: "No climbing data",
        details:
          "No valid climbing data found for this user. Make sure you've logged climbs on Mountain Project.",
      };
    }

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

    // 4a. All attempts grade counts
    const gradeCounts = {};
    rows.forEach((row) => {
      if (!gradeCounts[row.Rating]) gradeCounts[row.Rating] = 0;
      gradeCounts[row.Rating]++;
    });

    // 4b. Sends only grade counts
    const sendGradeCounts = {};
    send_rows.forEach((row) => {
      if (!sendGradeCounts[row.Rating]) sendGradeCounts[row.Rating] = 0;
      sendGradeCounts[row.Rating]++;
    });

    // Turn into sorted arrays
    const gradesArray = Object.entries(gradeCounts).sort((a, b) => b[1] - a[1]);
    const sendGradesArray = Object.entries(sendGradeCounts).sort(
      (a, b) => b[1] - a[1]
    );

    // 5. recent_climbs: sort by date descending and take the first 5
    rows.sort((a, b) => new Date(b.Date) - new Date(a.Date));
    const recent_climbs = rows.slice(0, 5);

    // 6. climbs_over_time: group by exact date
    const climbs_over_time = {};
    rows.forEach((row) => {
      if (!climbs_over_time[row.Date]) climbs_over_time[row.Date] = 0;
      climbs_over_time[row.Date]++;
    });

    // 7. Return the final object
    return {
      total_climbs,
      total_sends,
      grades: gradesArray,
      send_grades: sendGradesArray,
      recent_climbs,
      climbs_over_time,
    };
  } catch (error) {
    console.error("Error fetching Mountain Project data:", error);
    return {
      error: "Failed to fetch data",
      details: "Could not connect to Mountain Project. Please try again later.",
    };
  }
});
