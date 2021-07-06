const axios = require("axios").default;
const codes036 = require("./codes/036.json");
const codes389 = require("./codes/389.json");
const codes042 = require("./codes/042.json");
const codes383 = require("./codes/383.json");

const fs = require("fs");
const logos = {
  LOGO1: "5d16e7af-72e3-4cda-aa75-3418bdac7916",
  LOGO2: "cb18eb71-602e-4d9b-a734-ca3815f92282",
  LOGO4: "7dbfa98e-eb7e-45fd-93bf-dd22fadc3585",
  LOGO5: "bcb0a0f9-a61e-4591-b997-ec9079d7d2dd",
  LOGO8: "eec19851-42bb-4800-ab13-62de1bb49803",
};
let codeArrays = {
  "036": codes036,
  389: codes389,
  "042": codes042,
  383: codes383,
};

const start = async () => {
  for (let sid in codeArrays) {
    let codes = codeArrays[sid];
    for (let key in logos) {
      codes.length = 1;
      let logoguid = logos[key];
      for (let i = 0; i < codes.length; i++) {
        let [code, color] = codes[i];
        let spcode = code;
        let url = `https://app.promotron.com/api/PPAEXOmtyYPnqWgdR192r7MTP9jr5FRRAsWOu0aE/GvsRT40YLwgsw5RaIXe6Ky1Y0SqRe5E8WeBECFGh/visual/motive?sid=${sid}&spcode=${spcode}&motive=${logoguid}`;

        let name = `${sid}_${spcode}_${color}_${key}_big`;

        await download_image(url, `images${sid}/${name}.png`);
      }
    }
  }
};
const download_image = (url, image_path) =>
  axios({
    url,
    responseType: "stream",
  }).then(
    (response) =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on("finish", () => resolve())
          .on("error", (e) => reject(e));
      })
  );
start();
