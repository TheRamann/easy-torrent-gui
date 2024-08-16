document.getElementById('searchButton').addEventListener('click', () => {
    const provider = document.getElementById('providerSelect').value;
    const torrentName = document.getElementById('torrentNameInput').value;
    
    // Send search request to the main process
    window.electronAPI.searchTorrent(provider, torrentName);
  });
  
  // Listen for search results
  window.electronAPI.onSearchResult((result) => {
    document.getElementById('results').textContent = result;
  });
  