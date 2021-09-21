/*
  This script will look for any notes or reminders left in the code. only files in src will be checked for messages .for example
  TODO: check if the variables is less than or equal zero
  ERROR: The code below throws "Error message"
  WARN: Do not set the following variable to less than or equal zero
*/
const messageItems = [
  { message: "TODO", color: "\x1b[32m" }, // Green
  { message: "WARN", color: "\x1b[33m" }, // Yellow
  { message: "ERROR", color: "\x1b[31m" }, // Red
];
/*
 ** Colors**
- Reset = "\x1b[0m"
- Bright = "\x1b[1m"
- Dim = "\x1b[2m"
- Underscore = "\x1b[4m"
- Blink = "\x1b[5m"
- Reverse = "\x1b[7m"
- Hidden = "\x1b[8m"

Text Colors
- FgBlack = "\x1b[30m"
- FgRed = "\x1b[31m"
- FgGreen = "\x1b[32m"
- FgYellow = "\x1b[33m"
- FgBlue = "\x1b[34m"
- FgMagenta = "\x1b[35m"
- FgCyan = "\x1b[36m"
- FgWhite = "\x1b[37m"

Background Colors
- BgBlack = "\x1b[40m"
- BgRed = "\x1b[41m"
- BgGreen = "\x1b[42m"
- BgYellow = "\x1b[43m"
- BgBlue = "\x1b[44m"
- BgMagenta = "\x1b[45m"
- BgCyan = "\x1b[46m"
- BgWhite = "\x1b[47m"
*/

const path = require("path");
const fs = require("fs");

__dirname = path.dirname(__dirname);

function getFiles(filePath, array) {
  let folderContent = array || [];
  fs.readdirSync(filePath).forEach((file) => {
    file = path.join(filePath, file);

    if (fs.statSync(file).isDirectory()) {
      folderContent = getFiles(file, folderContent);
    } else {
      folderContent.push(file);
    }
  });
  return folderContent;
}

getFiles(path.join(__dirname, "src")).forEach((file) => {
  const content = fs.readFileSync(file, "utf-8").split("\n");
  for (let i = 0; i < content.length; i++) {
    let lineOfCode = content[i];
    messageItems.forEach((messageItem) => {
      // console.log(lineOfCode);
      if (lineOfCode.includes(messageItem.message)) {
        // Remove comments
        lineOfCode = lineOfCode
          .replace("<!--", "")
          .replace("-->", "")
          .replace("//", "")
          .replace("#", "")
          .trim();
        console.log(`${messageItem.color}%s\x1b[0m`, lineOfCode);
        console.log(`At line ${i + 1} in ${file}`);
      }
    });
  }
});
