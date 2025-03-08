import Papa from "papaparse";

export default defineEventHandler(async (event) => {
  // Get query parameters and log them for debugging
  const query = getQuery(event);
  const userId = query.userId;
  const userName = query.userName;

  console.log(`Received request for userId: ${userId}, userName: ${userName}`);

  if (!userId || !userName) {
    console.log("Missing required parameters");
    return {
      error: "Missing required parameters",
      details: "Both userId and userName are required",
    };
  }

  const url = `https://www.mountainproject.com/user/${userId}/${userName}/tick-export`;
  console.log(`Fetching data from: ${url}`);

  try {
    // Add timeout and retry logic for more reliable fetching
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

    // Try up to 3 times with increasing timeouts
    let csvText;
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        csvText = await fetchWithTimeout(url, {}, 10000 * (attempts + 1));
        break;
      } catch (error) {
        attempts++;
        console.log(`Attempt ${attempts} failed: ${error.message}`);
        if (attempts >= maxAttempts) throw error;
        // Wait before retry
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // Check if we got data
    if (!csvText || csvText.trim() === "") {
      console.log("Received empty response");
      return {
        error: "Empty response",
        details:
          "No data received from Mountain Project. Please check your User ID and Username.",
      };
    }

    // Log first few characters for debugging
    console.log(
      `Received CSV data (first 100 chars): ${csvText.substring(0, 100)}...`
    );

    // Parse CSV with more robust options
    const parsed = Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      error: (error) => {
        console.log(`CSV parsing error: ${error}`);
      },
    });

    if (parsed.errors && parsed.errors.length > 0) {
      console.log(`CSV parsing errors: ${JSON.stringify(parsed.errors)}`);
    }

    // Filter valid rows - be more lenient with empty fields
    const rows = parsed.data.filter((row) => {
      return row && typeof row === "object" && Object.keys(row).length > 0;
    });

    console.log(`Parsed ${rows.length} valid rows`);

    if (!rows.length) {
      return {
        error: "No climbing data",
        details:
          "No valid climbing data found for this user. Make sure you've logged climbs on Mountain Project.",
      };
    }

    // Process the data
    const total_climbs = rows.length;

    // Normalize grade function to handle grades with slashes (e.g., "5.11a/b" -> "5.11b")
    const normalizeGrade = (grade) => {
      if (!grade || typeof grade !== "string") return grade;

      // If the grade contains a slash, take the higher grade
      if (grade.includes("/")) {
        const parts = grade.split("/");
        return parts[0].substring(0, parts[0].length - 1) + parts[1];
      }

      return grade;
    };

    // Be more flexible with field names by normalizing/checking multiple possible names
    const getLedStyle = (row) => {
      const possibleFields = [
        "Lead Style",
        "LeadStyle",
        "leadstyle",
        "Lead_Style",
      ];
      for (const field of possibleFields) {
        if (row[field] !== undefined) return row[field];
      }
      return null;
    };

    const sendStyles = ["Onsight", "Flash", "Redpoint", "Pinkpoint"];
    const total_sends = rows.filter((row) => {
      const style = getLedStyle(row);
      return style && sendStyles.includes(style);
    }).length;

    const send_rows = rows.filter((row) => {
      const style = getLedStyle(row);
      return style && sendStyles.includes(style);
    });

    const gradeCounts = {};
    rows.forEach((row) => {
      if (row.Rating) {
        const normalizedGrade = normalizeGrade(row.Rating);
        if (!gradeCounts[normalizedGrade]) gradeCounts[normalizedGrade] = 0;
        gradeCounts[normalizedGrade]++;
      }
    });

    const sendGradeCounts = {};
    send_rows.forEach((row) => {
      if (row.Rating) {
        const normalizedGrade = normalizeGrade(row.Rating);
        if (!sendGradeCounts[normalizedGrade])
          sendGradeCounts[normalizedGrade] = 0;
        sendGradeCounts[normalizedGrade]++;
      }
    });

    const gradesArray = Object.entries(gradeCounts).sort((a, b) => b[1] - a[1]);
    const sendGradesArray = Object.entries(sendGradeCounts).sort(
      (a, b) => b[1] - a[1]
    );

    // Sort by date for recent climbs, handle various date formats
    const parseDate = (dateStr) => {
      if (!dateStr) return new Date(0);
      try {
        return new Date(dateStr);
      } catch (e) {
        return new Date(0);
      }
    };

    rows.sort((a, b) => {
      const dateA = parseDate(a.Date);
      const dateB = parseDate(b.Date);
      return dateB - dateA;
    });

    const recent_climbs = rows.slice(0, 5);

    const climbs_over_time = {};
    rows.forEach((row) => {
      if (row.Date) {
        if (!climbs_over_time[row.Date]) climbs_over_time[row.Date] = 0;
        climbs_over_time[row.Date]++;
      }
    });

    // Return the processed data
    console.log("Successfully processed data, returning results");
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
      details: `Error: ${error.message}. Please check your User ID and Username, and try again later.`,
    };
  }
});
