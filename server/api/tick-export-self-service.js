import Papa from "papaparse";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const userId = query.userId;
  const userName = query.userName;

  if (!userId || !userName) {
    return {
      error: "Missing required parameters",
      details: "Both userId and userName are required",
    };
  }

  const url = `https://www.mountainproject.com/user/${userId}/${userName}/tick-export`;

  try {
    const csvText = await $fetch(url);

    if (csvText.includes("<!DOCTYPE html>") || csvText.includes("<html>")) {
      return {
        error: "Invalid user data",
        details:
          "Could not retrieve climbing data. Please check your User ID and Username.",
      };
    }

    const parsed = Papa.parse(csvText, { header: true, dynamicTyping: true });

    const rows = parsed.data.filter(
      (row) => row.Date && row.Route && row.Rating
    );

    if (!rows.length) {
      return {
        error: "No climbing data",
        details:
          "No valid climbing data found for this user. Make sure you've logged climbs on Mountain Project.",
      };
    }

    const total_climbs = rows.length;

    const sendStyles = ["Onsight", "Flash", "Redpoint"];
    const total_sends = rows.filter((row) =>
      sendStyles.includes(row["Lead Style"])
    ).length;

    const send_rows = rows.filter((row) =>
      sendStyles.includes(row["Lead Style"])
    );

    const gradeCounts = {};
    rows.forEach((row) => {
      if (!gradeCounts[row.Rating]) gradeCounts[row.Rating] = 0;
      gradeCounts[row.Rating]++;
    });

    const sendGradeCounts = {};
    send_rows.forEach((row) => {
      if (!sendGradeCounts[row.Rating]) sendGradeCounts[row.Rating] = 0;
      sendGradeCounts[row.Rating]++;
    });

    const gradesArray = Object.entries(gradeCounts).sort((a, b) => b[1] - a[1]);
    const sendGradesArray = Object.entries(sendGradeCounts).sort(
      (a, b) => b[1] - a[1]
    );

    rows.sort((a, b) => new Date(b.Date) - new Date(a.Date));
    const recent_climbs = rows.slice(0, 5);

    const climbs_over_time = {};
    rows.forEach((row) => {
      if (!climbs_over_time[row.Date]) climbs_over_time[row.Date] = 0;
      climbs_over_time[row.Date]++;
    });

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
