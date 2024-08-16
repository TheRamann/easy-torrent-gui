const { contextBridge, ipcRenderer } = require('electron');

// Expose IPC functions to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  searchTorrent: (provider, torrentName) => ipcRenderer.send('search-torrent', { provider, torrentName }),
  onSearchResult: (callback) => ipcRenderer.on('search-result', (event, result) => callback(result)),
});
