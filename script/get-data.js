const Ig = require("../util/ig");
const { igOptions } = require("../util/configs");

async function main() {
    const client = new Ig(igOptions);

    const data = await client.getData({
        epic: "IX.D.FTSE.MTI.IP",
        resolution: "HOUR",
        numPoints: 500
    });

    const fs = require("fs");
    fs.writeFileSync("./data/sample-ftse.json", JSON.stringify(data, null, 2));
}

main();