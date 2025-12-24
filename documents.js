fetch("data/documents.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("documents-container");

    function renderSection(title, items) {
      if (!items || items.length === 0) return "";

      let html = `<h2>${title}</h2><ul>`;
      items.forEach(doc => {
        html += `
          <li>
            <strong>${doc.id}</strong> — ${doc.title}<br>
            Version: ${doc.version} · ${doc.date}<br>
            <a href="${doc.file}" target="_blank">View PDF</a>
          </li>
        `;
      });
      html += "</ul>";
      return html;
    }

    container.innerHTML =
      renderSection("Framework Documents", data.framework) +
      renderSection("Research Documents", data.research) +
      renderSection("Provenance Records", data.provenance);
  })
  .catch(error => {
    document.getElementById("documents-container").innerHTML =
      "<p>Error loading documents index.</p>";
    console.error(error);
  });
