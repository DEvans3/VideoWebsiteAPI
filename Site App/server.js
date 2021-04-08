const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome" });
  });

// PORT 
const port = process.env.PORT || 5000;
require("./routes/video.routes.js")(app);
app.listen(port, () => console.log('Listening on port ' + port + '...'));