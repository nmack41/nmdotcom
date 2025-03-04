import Papa from "papaparse";

export default defineEventHandler(async (event) => {
  const url =
    "https://www.mountainproject.com/user/201253016/nick-mackowski/tick-export";
  try {
    const csvText = await $fetch(url);

    const parsed = Papa.parse(csvText, { header: true, dynamicTyping: true });

    const rows = parsed.data.filter(
      (row) => row.Date && row.Route && row.Rating
    );

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

    const gradesArray = Object.entries(gradeCounts).sort((a, b) => b[1] - a[1]);

    const sendGradeCounts = {};
    send_rows.forEach((row) => {
      if (!sendGradeCounts[row.Rating]) sendGradeCounts[row.Rating] = 0;
      sendGradeCounts[row.Rating]++;
    });

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
    return { error: "Failed to fetch data", details: error.message };
  }
});
