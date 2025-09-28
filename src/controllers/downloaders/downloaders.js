const fs = require("fs");
const path = require("path");
const axios = require("axios");

const downloader = (req, res) => {
  let src;
  switch (req.params.filename) {
    case "resume":
      console.log("Resume is being downloaded");
      axios
        .post(
          "https://n8n.summy.dev/webhook-test/58abc73d-b9ca-44a4-9318-e193b2790260",
          {
            message: "RESUME DOWNLOADED",
            rawHeaders: req.rawHeaders,
            location: req.location,
          }
        )
        .catch((err) => {
          console.log("Failed to hit webhook", err.message);
        });
      src = fs.createReadStream(
        path.join(
          __dirname,
          "../../storage/pdf/Sumanth-Frontend-React-Developer-8_Years_Exp_v6.pdf"
        )
      );
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          "attachment; filename=Sumanth-Frontend-React-Developer-8_Years_Exp.pdf",
        "Content-Transfer-Encoding": "Binary",
      });

      src.pipe(res);
      break;
    case "vcard":
      src = fs.createReadStream(
        path.join(__dirname, "../../storage/vcard/vcard.vcf")
      );
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=vcard.vcf",
        "Content-Transfer-Encoding": "Binary",
      });

      src.pipe(res);
      break;
    default:
      res.status(404).send("Requested file not found");
      break;
  }
};

module.exports = {
  downloader,
};
