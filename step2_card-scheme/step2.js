const express = require("express");
const axios = require("axios");
const card_scheme = express();
const port_num = 3001;

// in-memory store for card hit counts
const card_hits = {};

// verify endpoint - same as step 1 but also tracks hits
card_scheme.get(
  "/api/card-scheme/verify/:cardNumber",
  async (req, res) => {
    // getting the cardnumber
    const card_num = req.params.cardNumber;

    // track the hit
    card_hits[card_num] = (card_hits[card_num] || 0) + 1;

    // if request is successful go into try if not go into catch
    try {
      // getting the info from binlist by cardnumber
      const response = await axios.get(
        `https://lookup.binlist.net/${card_num}`
      );
      // paste into local object
      const card_info = {
        success: true,
        payload: {
          scheme: response.data.scheme,
          type: response.data.type,
          bank: response.data.bank ? response.data.bank.name : "N/A",
        },
      };
      // send back the info we got as json
      res.json(card_info);
    } catch (error) {
      // if unsuccessful send back an error as json
      res.json({ success: false, error: "invalid card number" });
    }
  }
);

// stats endpoint - returns hit counts for verified cards
card_scheme.get("/api/card-scheme/stats", (req, res) => {
  const start = parseInt(req.query.start) || 1;
  const limit = parseInt(req.query.limit) || 5;

  // get all card entries sorted by hit count descending
  const all_cards = Object.entries(card_hits).sort((a, b) => b[1] - a[1]);

  // paginate (start is 1-indexed)
  const paginated = all_cards.slice(start - 1, start - 1 + limit);

  // build payload object
  const payload = {};
  paginated.forEach(([card, count]) => {
    payload[card] = count;
  });

  // calculate size in bytes
  const size = Buffer.byteLength(JSON.stringify(payload));

  res.json({
    success: true,
    start: start,
    limit: limit,
    size: size,
    payload: payload,
  });
});

// run service
card_scheme.listen(port_num, () => {
  console.log(`server is running - port: ${port_num}`);
});
