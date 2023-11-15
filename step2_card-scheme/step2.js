const express = require("express");
const card_scheme = express();
const port_num = 3001;
card_scheme.get("", async (req, res) => {
  try {
    //success statement
  } catch (error) {
    //error statement
  }
});

app.listen(port, () => {
  console.log(`server is running - port: ${port_num}`);
});
