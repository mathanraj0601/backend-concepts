const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./spec");

const app = new express();

app.use(express.json());

app.get("/fullname", (req, res) => {
  const { fname, lname } = req.query;

  if (!fname || !lname) {
    return res.status(400).send();
  }

  return res.json({
    data: {
      fullname: fname + lname,
    },
  });
});

console.log(swaggerDocument);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log("App Listen on port 3000");
});
