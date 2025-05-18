const {app, BrowserWindow} = require("electron");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
        }
    });
    win.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
        if (permission === 'geolocation') {
            callback(true); // 允许获取定位
        } else {
            callback(false);
        }
    });
    win.loadURL("https://easy-weather-big1.vercel.app/");
}


app.whenReady().then(createWindow)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})