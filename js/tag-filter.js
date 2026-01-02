// Tag filtering functionality for Quick Links page
document.addEventListener("DOMContentLoaded", function () {
  const tags = new Set();
  const listItems = document.querySelectorAll("#quick-links li");

  // Gather all tags
  listItems.forEach((li) => {
    const tagList = li.getAttribute("data-tags").split(" ");
    tagList.forEach((tag) => tags.add(tag));
  });

  // Create tag filter UI
  const filter = document.getElementById("tag-filter");
  filter.setAttribute("role", "group");
  filter.setAttribute("aria-label", "Filter links by tag");
  filter.innerHTML = '<strong id="filter-label">Filter by tag:</strong> ';

  let activeFilter = null;

  tags.forEach((tag) => {
    const btn = document.createElement("button");
    btn.textContent = `#${tag}`;
    btn.className = "tag-button";
    btn.setAttribute("type", "button");
    btn.setAttribute("aria-pressed", "false");
    btn.setAttribute("aria-label", `Filter by ${tag.replace(/_/g, ' ')}`);

    const filterByTag = () => {
      // Update active filter
      if (activeFilter === tag) {
        // Deactivate if clicking same tag
        activeFilter = null;
        btn.setAttribute("aria-pressed", "false");
        listItems.forEach((li) => (li.style.display = ""));
      } else {
        // Clear previous active state
        filter.querySelectorAll(".tag-button").forEach(b => b.setAttribute("aria-pressed", "false"));
        // Set new active state
        activeFilter = tag;
        btn.setAttribute("aria-pressed", "true");
        listItems.forEach((li) => {
          const liTags = li.getAttribute("data-tags").split(" ");
          li.style.display = liTags.includes(tag) ? "" : "none";
        });
      }
    };

    btn.onclick = filterByTag;

    // Keyboard support
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        filterByTag();
      }
    });

    filter.appendChild(btn);
  });

  // Add "Show all" button
  const reset = document.createElement("button");
  reset.textContent = "Show all";
  reset.className = "tag-button tag-button-reset";
  reset.setAttribute("type", "button");
  reset.setAttribute("aria-label", "Show all links");

  const resetFilter = () => {
    activeFilter = null;
    filter.querySelectorAll(".tag-button").forEach(b => b.setAttribute("aria-pressed", "false"));
    listItems.forEach((li) => (li.style.display = ""));
  };

  reset.onclick = resetFilter;

  // Keyboard support for reset button
  reset.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      resetFilter();
    }
  });

  filter.appendChild(reset);
});
