document.getElementById('searchButton').addEventListener('click', () => {
  const provider = document.getElementById('providerSelect').value;
  const torrentName = document.getElementById('torrentNameInput').value;
  
  // Send search request to the main process
  window.electronAPI.searchTorrent(provider, torrentName);
});

window.electronAPI.onSearchResult((result) => {
  const resultsElement = document.getElementById('results');
  const noResultsElement = document.getElementById('no-results');
  const tbody = resultsElement.querySelector('tbody');
  
  // Clear previous results
  tbody.innerHTML = '';
  resultsElement.style.display = 'none';
  noResultsElement.style.display = 'none';

  try {
      const data = JSON.parse(result);

      if (data.length === 0) {
          noResultsElement.style.display = 'block';
          return;
      }

      resultsElement.style.display = 'table';
      data.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${item.title}</td>
              <td>${item.size}</td>
              <td>${item.seeds}</td>
              <td>${item.peers}</td>
              <td><a href="${item.magnet}" target="_blank">Magnet Link</a></td>
          `;
          tbody.appendChild(row);
      });
  } catch (error) {
      resultsElement.style.display = 'none';
      noResultsElement.textContent = `Error: ${error.message}`;
      noResultsElement.style.display = 'block';
  }
});
