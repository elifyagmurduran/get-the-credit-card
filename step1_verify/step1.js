const express = require("express");
const axios = require("axios");
const verification_service = express();
const port_num = 3000;
// the express app
verification_service.get(
  "/api/card-scheme/verify/:cardNumber",
  async (req, res) => {
    //getting the cardnumber
    const card_num = req.params.cardNumber;
    //if request is successful go into try if not go into catch
    try {
      //getting the info from binlist by cardnumber
      const response = await axios.get(
        `https://lookup.binlist.net/${card_num}`
      );
      //paste into local object
      const card_info = {
        success: true,
        payload: {
          scheme: response.data.scheme,
          type: response.data.type,
          bank: response.data.bank ? response.data.bank.name : "N/A",
        },
      };
      //send back the info we got as json
      res.json(card_info);
    } catch (error) {
      //if unsuccessful send back an error as json
      res.json({ success: false, error: "invalid card number" });
    }
  }
);
//run service
verification_service.listen(port_num, () => {
  console.log(`server is running - port: ${port_num}`);
});
