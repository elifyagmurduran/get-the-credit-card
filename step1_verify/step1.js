const express = require('express');
const axios = require('axios');
const verification_service = express();
const port_num = 3000;

verification_service.get('/api/card-scheme/verify/:cardNumber', async (req, res) => {
  const card_num = req.params.cardNumber;
  try {
    const response = await axios.get(`https://lookup.binlist.net/${card_num}`);

    const card_info = {
      success: true,
      payload: {
        scheme: response.data.scheme,
        type: response.data.type,
        bank: response.data.bank ? response.data.bank.name : 'N/A',
      },
    };

    res.json(card_info);
  } catch (error) {
    res.json({ success: false, error: "invalid card number" });
  }
});

verification_service.listen(port_num, () => {
  console.log(`server is running - port: ${port_num}`);
});
