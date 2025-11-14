const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"), 10);

const product = products.find((p) => p.id === productId);

if (!product) {
  document.querySelector(".pdp-section").innerHTML =
    "<h2>Product not found</h2>";
}

document.getElementById("pdp-title").textContent = product.name;
document.getElementById("pdp-price").textContent = `$${product.price}`;
document.getElementById("pdp-old-price").textContent = product.oldPrice
  ? `$${product.oldPrice}`
  : "";

function generateStars(count) {
  let stars = "";
  for (let i = 0; i < count; i++) {
    stars += `<img src="assets/icons/star.png" alt="star" />`;
  }
  return stars;
}

document.getElementById("pdp-stars").innerHTML = generateStars(product.stars);
document.getElementById(
  "pdp-reviews"
).textContent = `${product.reviews} Reviews`;

if (product.shortDesc) {
  document.getElementById("pdp-short-desc").textContent = product.shortDesc;
}

document.getElementById("pdp-main-img").src = product.img;

const thumbsBox = document.getElementById("pdp-thumbs");

const thumbs = [product.img, ...(product.thumbnail || [])];

thumbsBox.innerHTML = thumbs
  .map((src) => `<img class="thumb" src="${src}" />`)
  .join("");

function setupThumbnailClicks() {
  const mainImg = document.getElementById("pdp-main-img");

  document.querySelectorAll(".thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      mainImg.src = thumb.src;

      document
        .querySelectorAll(".thumb")
        .forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });
}

setupThumbnailClicks();

document.getElementById("addToCartBtn").addEventListener("click", () => {
  incrementCartCount();
});

document.getElementById("buyNowBtn").addEventListener("click", () => {
  incrementCartCount();
  window.location.href = "order-success.html";
});
