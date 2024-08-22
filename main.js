const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const TorrentSearchApi = require('torrent-search-api');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,  
      contextIsolation: true,  
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// IPC handler for searching torrents
ipcMain.on('search-torrent', async (event, { provider, torrentName }) => {
  try {
    TorrentSearchApi.enableProvider(provider);
    const results = await TorrentSearchApi.search(torrentName);
    event.reply('search-result', JSON.stringify(results, null, 2));
  } catch (error) {
    event.reply('search-result', `Error: ${error.message}`);
  } finally {
    TorrentSearchApi.disableAllProviders();
  }
});
