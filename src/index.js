const express = require("express");
const routers = require("./routes/index.routes");
const PORT = process.env.PORT;
const app = express();

app.use(routers);

// Erros
app.use((err, req, res, next) => {
  return res.json({
    message: err.message,
  });
});

app.listen(PORT || 4000);

PORT ? console.log(`Server on ${PORT}`) : console.log(`Server on 4000`);
