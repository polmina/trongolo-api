const fetch = require("node-fetch");

const getLogo = (logo, resolve) => {
  fetch(
    new URL(
      `api/PPAEXOmtyYPnqWgdR192r7MTP9jr5FRRAsWOu0aE/GvsRT40YLwgsw5RaIXe6Ky1Y0SqRe5E8WeBECFGh/visual/logoupload/?mode=DOWNLOAD&src=${logo}&format=png&gen=ALL&clr=ALL`,
      "https://app.promotron.com/"
    ),
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      //body: JSON.stringify(data),
    }
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      resolve(data);
    })
    .catch(function (err) {
      resolve(err);
    });
};

module.exports = getLogo;
