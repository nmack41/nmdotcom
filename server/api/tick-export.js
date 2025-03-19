import Papa from "papaparse";

function parseLocation(location) {
  const result = {
    area: "",
    crag: "",
    wall: "",
  };

  if (!location) return result;

  // Split the location by ">"
  const parts = location.split(">");

  if (parts.length >= 2) {
    result.area = parts[1];

    if (parts.length >= 3) {
      result.crag = parts[2];

      if (parts.length >= 4) {
        result.wall = parts[3];
      }
    }
  }

  return result;
}

// Normalizes a grade by handling slashes like "5.11a/b" -> "5.11b"
function normalizeGrade(grade) {
  if (!grade || typeof grade !== "string") return grade;

  // If the grade contains a slash, take the higher grade
  if (grade.includes("/")) {
    const parts = grade.split("/");
    return parts[0].substring(0, parts[0].length - 1) + parts[1];
  }

  return grade;
}

// Gets the lead style from a row, handling different possible field names
function getLedStyle(row) {
  return row["Lead Style"] !== undefined ? row["Lead Style"] : null;
}

export default defineEventHandler(async (event) => {
  // Get query parameters to check if this is a self-service request
  const query = getQuery(event);
  const userId = query.userId;
  const userName = query.userName;

  // Default URL for Nick Mackowski
  let url =
    "https://www.mountainproject.com/user/201253016/nick-mackowski/tick-export";

  // If userId and userName are provided, use them instead
  if (userId && userName) {
    url = `https://www.mountainproject.com/user/${userId}/${userName}/tick-export`;
  }

  try {
    // Add timeout for more reliable fetching
    const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      try {
        const response = await $fetch(url, {
          ...options,
          signal: controller.signal,
        });
        clearTimeout(id);
        return response;
      } catch (error) {
        clearTimeout(id);
        throw error;
      }
    };

    const csvText = await fetchWithTimeout(url);

    // Check if we got data
    if (!csvText || csvText.trim() === "") {
      console.log("Received empty response");
      return {
        error: "Empty response",
        details:
          "No data received from Mountain Project. Please check your User ID and Username.",
      };
    }

    // Parse CSV with Papaparse
    const parsed = Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    });

    // Filter valid rows
    const rows = parsed.data.filter(
      (row) =>
        row &&
        typeof row === "object" &&
        Object.keys(row).length > 0 &&
        row.Date &&
        row.Route &&
        row.Rating
    );

    // Output total number of climbs
    const total_climbs = rows.length;

    // Define send styles
    const sendStyles = ["Onsight", "Flash", "Redpoint", "Pinkpoint"];

    // Count total sends properly, including boulder problems
    const total_sends = rows.filter((row) => {
      const style = getLedStyle(row);
      // For boulders, check if the Rating starts with 'V' and Style doesn't indicate a failed attempt
      const isBoulderSend =
        row.Rating &&
        row.Rating.toString().startsWith("V") &&
        row.Style &&
        !["Attempt", "Fell/Hung"].includes(row.Style);

      return (style && sendStyles.includes(style)) || isBoulderSend;
    }).length;

    // Filter sends for grade statistics
    const send_rows = rows.filter((row) => {
      const style = getLedStyle(row);
      const isBoulderSend =
        row.Rating &&
        row.Rating.toString().startsWith("V") &&
        row.Style &&
        !["Attempt", "Fell/Hung"].includes(row.Style);

      return (style && sendStyles.includes(style)) || isBoulderSend;
    });

    // Calculate grade statistics for all climbs
    const gradeCounts = {};
    rows.forEach((row) => {
      if (row.Rating) {
        const normalizedGrade = normalizeGrade(row.Rating.toString());
        if (!gradeCounts[normalizedGrade]) gradeCounts[normalizedGrade] = 0;
        gradeCounts[normalizedGrade]++;
      }
    });

    // Calculate grade statistics for sends only
    const sendGradeCounts = {};
    send_rows.forEach((row) => {
      if (row.Rating) {
        const normalizedGrade = normalizeGrade(row.Rating.toString());
        if (!sendGradeCounts[normalizedGrade])
          sendGradeCounts[normalizedGrade] = 0;
        sendGradeCounts[normalizedGrade]++;
      }
    });

    const gradesArray = Object.entries(gradeCounts).sort((a, b) => b[1] - a[1]);
    const sendGradesArray = Object.entries(sendGradeCounts).sort(
      (a, b) => b[1] - a[1]
    );

    // Process location data and add Area, Crag, and Wall properties to each climb
    const processedRows = rows.map((row) => {
      const locationData = parseLocation(row.Location || "");
      return {
        ...row,
        Area: locationData.area,
        Crag: locationData.crag,
        Wall: locationData.wall,
      };
    });

    // Sort by date
    processedRows.sort((a, b) => {
      const dateA = new Date(a.Date || 0);
      const dateB = new Date(b.Date || 0);
      return dateB - dateA;
    });

    const recent_climbs = processedRows.slice(0, 5);

    // Analyze climbs by time
    const climbs_over_time = {};
    const climbs_by_year = {};

    processedRows.forEach((row) => {
      if (row.Date) {
        // For detailed date tracking
        if (!climbs_over_time[row.Date]) climbs_over_time[row.Date] = 0;
        climbs_over_time[row.Date]++;

        // For year-based tracking
        const year = new Date(row.Date).getFullYear();
        if (!climbs_by_year[year]) climbs_by_year[year] = 0;
        climbs_by_year[year]++;
      }
    });

    // Calculate popular areas, crags, and walls
    const areaCounts = {};
    const cragCounts = {};
    const wallCounts = {};

    processedRows.forEach((row) => {
      if (row.Area) {
        areaCounts[row.Area] = (areaCounts[row.Area] || 0) + 1;
      }
      if (row.Crag) {
        cragCounts[row.Crag] = (cragCounts[row.Crag] || 0) + 1;
      }
      if (row.Wall) {
        wallCounts[row.Wall] = (wallCounts[row.Wall] || 0) + 1;
      }
    });

    const popularAreas = Object.entries(areaCounts)
      .filter(([area]) => area)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const popularCrags = Object.entries(cragCounts)
      .filter(([crag]) => crag)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    const popularWalls = Object.entries(wallCounts)
      .filter(([wall]) => wall)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Return the processed data
    console.log("Successfully processed data, returning results");
    return {
      total_climbs,
      total_sends,
      grades: gradesArray,
      send_grades: sendGradesArray,
      recent_climbs,
      ordered_climbs: processedRows,
      all_climbs: processedRows,
      climbs_over_time,
      climbs_by_year,
      popular_areas: popularAreas,
      popular_crags: popularCrags,
      popular_walls: popularWalls,
    };
  } catch (error) {
    console.error("Error fetching Mountain Project data:", error);
    return {
      error: "Failed to fetch data",
      details: `Error: ${error.message}. ${
        userId
          ? "Please check your User ID and Username, and try again later."
          : ""
      }`,
    };
  }
});
