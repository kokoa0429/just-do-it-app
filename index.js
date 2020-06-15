const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const Tray = electron.Tray;
const nativeImage = electron.nativeImage
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;
app.on('ready', () => {

  var trayIcon = new Tray(nativeImage.createFromPath(__dirname + "/icon.png"));
  var contextMenu = Menu.buildFromTemplate([
      { label: "終了", click: function () { app.quit(); } }
  ]);
  trayIcon.setContextMenu(contextMenu);
  trayIcon.setToolTip(app.getName());
 
  app.on("window-all-closed", ((e) => {
    e.preventDefault();  
    var trayIcon = new Tray(nativeImage.createFromPath(__dirname + "/icon.png"));
    var contextMenu = Menu.buildFromTemplate([
        { label: "終了", click: function () { app.quit(); } }
    ]);
    trayIcon.setContextMenu(contextMenu);
    trayIcon.setToolTip(app.getName());
  }));
});

let mouseX;
let mouseY;
let omouseX;
let omouseY;
setInterval(() => {
  let mousePos = electron.screen.getCursorScreenPoint();
  omouseX = mouseX;
  omouseY = mouseY;
  mouseX = mousePos.x;
  mouseY = mousePos.y;
  if(omouseX === mouseX && omouseY === mouseY) {
    mainWindow = new BrowserWindow({
      width: 977,
      height: 580,
      minWidth: 977,
      minHeight: 580,
      maxWidth: 977,
      maxHeight: 580,
      autoHideMenuBar: true,
      alwaysOnTop: true 
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    setTimeout(() => {
      mainWindow.close()
    },9000)
  }
},60* 1000)