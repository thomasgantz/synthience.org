document.addEventListener("DOMContentLoaded", () => {
  fetch("/data/documents.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load documents.json");
      }
      return response.json();
    })
    .then(data => {
      renderSection("framework", data.framework);
      renderSection("research", data.research);
      renderSection("provenance", data.provenance);
    })
    .catch(error => {
      console.error("Document load error:", error);
    });
});

function renderSection(sectionName, items) {
  const section = document.getElementById(`${sectionName}-section`);
  const list = section.querySelector(".doc-list");

  if (!items || items.length === 0) {
    section.style.display = "none";
    return;
  }

  items.forEach(item => {
    const li = document.createElement("li");
    li.className = "doc-item";

    const link = document.createElement("a");
    link.href = item.file;
    link.textContent = `${item.id} — ${item.title} (${item.version})`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const meta = document.createElement("div");
    meta.className = "doc-meta";
    meta.textContent = `Release date: ${item.date}`;

    li.appendChild(link);
    li.appendChild(meta);
    list.appendChild(li);
  });
}
