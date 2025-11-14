const plpGrid = document.querySelector(".plp-grid");
const emptyMsg = document.querySelector(".plp-empty-msg");
const productCountEl = document.querySelector(".plp-count");
const categoryCheckboxes = document.querySelectorAll(".filter-category");
const typeCheckboxes = document.querySelectorAll(".filter-type");
const ratingCheckboxes = document.querySelectorAll(".filter-rating");
const sortDropdown = document.getElementById("sortDropdown");
const filterBtn = document.querySelector(".filter-btn");
const filterPanel = document.getElementById("plpFilterPanel");
const gridBtn = document.querySelector(".grid-icon");
const listBtn = document.querySelector(".list-icon");
const plpGridElement = document.querySelector(".plp-grid");

window.addEventListener("DOMContentLoaded", () => {
  applyFiltersAndSortAndRender("az");
});

function generateStars(count) {
  let stars = "";
  for (let i = 0; i < count; i++) {
    stars += `<img src="assets/icons/star.png" alt="star" />`;
  }
  return stars;
}

function renderProducts(productList) {
  plpGrid.innerHTML = "";

  productList.forEach((product) => {
    const productCard = `
      <div class="plp-product-card" data-id="${product.id}">
        <img src="${product.img}" class="plp-product-img" />
        <div class="plp-details">
          <h3 class="plp-product-title">${product.name}</h3>
          <div class="plp-price-row">
            <span class="current">$${product.price}</span>
            ${
              product.oldPrice
                ? `<span class="old">$${product.oldPrice}</span>`
                : ""
            }
          </div>
          <div class="plp-rating-row">
            <div class="stars">${generateStars(product.stars)}</div>
            <span class="reviews">${product.reviews} Reviews</span>
          </div>
        </div>
      </div>
    `;
    plpGrid.insertAdjacentHTML("beforeend", productCard);
  });

  plpCardClickEvents();

  const count = productList.length;
  if (productCountEl) productCountEl.textContent = `(${count})`;
  emptyMsg.style.display = count === 0 ? "block" : "none";
}

function getSelectedValues(nodeList) {
  return [...nodeList].filter((cb) => cb.checked).map((cb) => cb.value);
}

function getFilteredProducts() {
  let filtered = [...products];

  const selectedCategories = getSelectedValues(categoryCheckboxes);
  const selectedTypes = getSelectedValues(typeCheckboxes);
  const selectedRatings = getSelectedValues(ratingCheckboxes).map(Number);

  if (selectedCategories.length > 0) {
    filtered = filtered.filter((p) => selectedCategories.includes(p.category));
  }
  if (selectedTypes.length > 0) {
    filtered = filtered.filter((p) => selectedTypes.includes(p.type));
  }
  if (selectedRatings.length > 0) {
    const minRating = Math.min(...selectedRatings);
    filtered = filtered.filter((p) => p.stars >= minRating);
  }

  return filtered;
}

function applyFiltersAndSortAndRender() {
  const filtered = getFilteredProducts();
  const sortValue = sortDropdown.value;
  let toRender = [...filtered];

  if (sortValue === "az") toRender.sort((a, b) => a.name.localeCompare(b.name));
  else if (sortValue === "za")
    toRender.sort((a, b) => b.name.localeCompare(a.name));
  else if (sortValue === "low-high") toRender.sort((a, b) => a.price - b.price);
  else if (sortValue === "high-low") toRender.sort((a, b) => b.price - a.price);

  renderProducts(toRender);
}

function plpCardClickEvents() {
  const cards = document.querySelectorAll(".plp-product-card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const productId = card.getAttribute("data-id");
      window.location.href = `pdp.html?id=${productId}`;
    });
  });
}

renderProducts(products);

categoryCheckboxes.forEach((cb) =>
  cb.addEventListener("change", applyFiltersAndSortAndRender)
);
typeCheckboxes.forEach((cb) =>
  cb.addEventListener("change", applyFiltersAndSortAndRender)
);
ratingCheckboxes.forEach((cb) =>
  cb.addEventListener("change", applyFiltersAndSortAndRender)
);

sortDropdown.addEventListener("change", applyFiltersAndSortAndRender);

filterBtn.addEventListener("click", () => {
  filterPanel.classList.toggle("active");
});

gridBtn.addEventListener("click", () => {
  plpGridElement.classList.remove("list-view");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
  plpGridElement.classList.add("list-view");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
});
