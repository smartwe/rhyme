let electron = require("child_process").spawn("npm", ["run", "electron"], {
  stdio: ["ignore", "inherit", "inherit"],
  shell: true,
});

let rollup = require("child_process").spawn("npm", ["run", "start"], {
  stdio: ["ignore", "inherit", "inherit"],
  shell: true,
});

function exit() {
  rollup.kill();
  electron.kill();
}

electron.on("disconnect", exit);
rollup.on("disconnect", exit);
