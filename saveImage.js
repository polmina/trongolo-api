var fs = require("fs"),
  request = require("request");

var download = function (uri, filename, callback) {
  request.head(uri, async function (err, res, body) {
    await request(uri)
      .pipe(fs.createWriteStream(filename))
      .on("close", callback);
  });
};

module.exports = download;
