const regeneratorRuntime = require("regenerator-runtime");
const fetch = require("node-fetch");

const LeaderboardContent = {
  URL:
    "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ESYau4Rpn7HGusloUq/scores",
  submitScore: async (username, score) => {
    fetch(LeaderboardContent.URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: username,
        score: score.toString(),
      }),
    });
  },
  getScores: async () => {
    try {
      const response = await fetch(LeaderboardContent.URL, { mode: "cors" });
      const result = response.json();
      return result;
    } catch (err) {
      return err;
    }
  },
};

export { LeaderboardContent };
