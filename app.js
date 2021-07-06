const getLogo = require("./getLogo");
const download = require("./saveImage");

const codes036 = require("./codes/036.json");
const codes389 = require("./codes/389.json");

let sid = "389";
const CHUNK_SIZE = 20;

const logos = {
  LOGO1: "5d16e7af-72e3-4cda-aa75-3418bdac7916",
  LOGO2: "cb18eb71-602e-4d9b-a734-ca3815f92282",
  LOGO4: "7dbfa98e-eb7e-45fd-93bf-dd22fadc3585",
  LOGO5: "bcb0a0f9-a61e-4591-b997-ec9079d7d2dd",
  LOGO8: "eec19851-42bb-4800-ab13-62de1bb49803",
};
let codes = codes389;
let currentLogos = {};
const start = async () => {
  for (let key in logos) {
    let logoguid = logos[key];
    //getLogo(logo, async ({ status, logoguid }) => {
    //console.log("status", status);

    codes.length = 50;

    for (let i = 0; i < codes.length; i++) {
      console.log(i);
      let [code, color] = codes[i];
      let spcode = code;
      let url = `https://app.promotron.com/api/PPAEXOmtyYPnqWgdR192r7MTP9jr5FRRAsWOu0aE/GvsRT40YLwgsw5RaIXe6Ky1Y0SqRe5E8WeBECFGh/visual/motive?sid=${sid}&spcode=${spcode}&motive=${logoguid}`;

      let name = `${sid}_${spcode}_${color}_${key}_big`;
      currentLogos[name] = url;
      if (Object.entries(currentLogos).length === 1) {
        await startDownloads();
      }
      //console.log(Object.entries(currentLogos).length);
    }
  }
};

const startDownloads = () => {
  return new Promise((resolve) => {
    for (let key in currentLogos) {
      download(currentLogos[key], `images${}/${key}.png`, function () {
        currentLogos[key] = true;
        if (Object.values(currentLogos).every((e) => e === true)) {
          currentLogos = {};
          console.log("yuhu");
          resolve();
        }
      });
    }
  });
};
start();
//1 2 4 5 8
