const fs = require("fs");
const path = require("path");

const compDir = path.join(process.cwd(), "src", "components");
const files = fs.readdirSync(compDir).filter(f => f.endsWith(".tsx"));

for (const f of files) {
  const content = fs.readFileSync(path.join(compDir, f), "utf8");
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
  let m;
  while ((m = imgRegex.exec(content)) !== null) {
    console.log(`${f} -> ${m[1]} | ${m[0].slice(0, 100)}`);
  }
}
