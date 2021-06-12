const { BrowserWindow, Menu, app } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`),
  });
}
// Disable hardware acceleration and enabling transparent visuals
app.disableHardwareAcceleration();
app.commandLine.appendSwitch("enable-transparent-visuals");

app.on("ready", () => {
  setTimeout(() => {
    let win = new BrowserWindow({
      icon: path.join(__dirname, "icon.png"),
      title: "Rhyme",
      width: 900,
      height: 600,
      frame: process.platform === "linux" ? true : false,
      titleBarStyle: "hiddenInset",
      transparent: true,
    });
    win.loadFile(path.join(__dirname, "public", "index.html"));
  }, 500);
});
