document.addEventListener("DOMContentLoaded", () => {
  let cartIcon = document.getElementById("cartIcon");
  let cartCount = document.getElementById("cartCount");
  let cartContainer = document.getElementById("cartContainer");
  let cartItemsList = document.getElementById("cartItemsList");
  let cartTotal = document.getElementById("cartTotal");
  let addToCart = document.querySelectorAll(".addToCart");

    cartIcon.addEventListener("click", () => {
    cartContainer.classList.toggle("hidden");
    });
    addToCart.forEach((btn) => {
    btn.addEventListener("click", () => {
      let card = btn.closest(".cartItems");

      let name = card.querySelector("h2").textContent.trim();
      let price = Number(btn.dataset.price);
      let imgSrc = card.querySelector("img").src;

      let existingItem = [...cartItemsList.querySelectorAll(".cart-item")].find(
        (item) => item.dataset.name === name
      );

      if (existingItem) {
        let qtyEl = existingItem.querySelector(".qty");
        let currentQty = Number(qtyEl.textContent.replace(" ×", ""));
        let newQty = currentQty + 1;
        qtyEl.textContent = newQty + " ×";

        existingItem.querySelector(".item-price").textContent =
          "$" + price * newQty;
      } else {
        let itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
        itemDiv.dataset.name = name;

        itemDiv.style.display = "flex";
        itemDiv.style.alignItems = "center";
        itemDiv.style.margin = "10px 0";

        itemDiv.innerHTML = `
          <img src="${imgSrc}" alt="${name}" style="width:60px; height:60px; object-fit:cover; border-radius:6px; margin-right:10px;">
          <span style="flex:1;">${name}</span>
          <span class="qty">1 ×</span>
          <span class="item-price" style="margin:0 10px;">$${price}</span>
          <i class="fa-solid fa-trash remove-btn" style="margin-left:10px; color:red; cursor:pointer;"></i>
        `;

        cartItemsList.appendChild(itemDiv);

        itemDiv.querySelector(".remove-btn").addEventListener("click", () => {
          let qty = Number(itemDiv.querySelector(".qty").textContent.replace(" ×", ""));
          let itemPrice = price * qty;

          cartCount.textContent = Number(cartCount.textContent) - qty;
          cartTotal.textContent = Number(cartTotal.textContent) - itemPrice;

          itemDiv.remove();
        });
      }

      cartCount.textContent = Number(cartCount.textContent) + 1;

      cartTotal.textContent = Number(cartTotal.textContent) + price;
    });
  });

  cartIcon.addEventListener("click", () => {
    if (cartContainer.style.display === "block") {
      cartContainer.style.display = "none";
    } else {
      cartContainer.style.display = "block";
    }
  });
});