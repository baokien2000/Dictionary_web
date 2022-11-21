const express = require("express"),
    fetch = require("node-fetch"),
    port = 5500,
    app = express();

var cors = require("cors");

app.use(cors());
let app_id = "7be34a7a",
    app_key = "779c62caf3b942aa5bb26af633bd129e",
    endpoint = "entries";

// let language_code = "en-us";
app.get("/:id", function (req, res) {
    const word = req.params.id.split("+")[0];
    let language_code = req.params.id.split("+")[1];

    let url = `https://od-api.oxforddictionaries.com/api/v2/${endpoint}/${language_code}/${word}`;

    fetch(url, {
        method: "GET",
        mode: "no-cors",
        headers: { app_key: app_key, app_id: app_id },
    })
        .then((response) => response.json())
        .then((data) => res.send(data));
});

app.listen(port);
