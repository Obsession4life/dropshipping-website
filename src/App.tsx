import { useRef, useState } from "react";
import "./App.css";
import { products } from "./products";

function App() {
  const [cart, setCart] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedProduct, setSelectedProduct] = useState<number | null>(
    null
  );

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [deliveryMethod, setDeliveryMethod] =
    useState("Standard Delivery");

  /* =========================
     CART FEEDBACK
  ========================= */

  const [cartBump, setCartBump] = useState(false);
  const [addButtonId, setAddButtonId] = useState<number | null>(null);
  const [addedProductName, setAddedProductName] = useState("");

  const feedbackTimeoutRef = useRef<number | undefined>(undefined);
  const buttonTimeoutRef = useRef<number | undefined>(undefined);

  /* =========================
     CART
  ========================= */

  const addToCart = (productId: number, quantity = 1) => {
    const newItems = Array(quantity).fill(productId);

    setCart((prevCart) => [...prevCart, ...newItems]);

    const product = products.find(
      (item) => item.id === productId
    );

    setAddedProductName(product?.name ?? "Product");

    setCartBump(true);
    setAddButtonId(productId);

    if (feedbackTimeoutRef.current) {
      window.clearTimeout(feedbackTimeoutRef.current);
    }

    if (buttonTimeoutRef.current) {
      window.clearTimeout(buttonTimeoutRef.current);
    }

    buttonTimeoutRef.current = window.setTimeout(() => {
      setCartBump(false);
      setAddButtonId(null);
    }, 450);

    feedbackTimeoutRef.current = window.setTimeout(() => {
      setAddedProductName("");
    }, 1800);
  };

  const removeFromCart = (productId: number) => {
    const index = cart.indexOf(productId);

    if (index !== -1) {
      const newCart = [...cart];

      newCart.splice(index, 1);

      setCart(newCart);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartQuantity = (productId: number) => {
    return cart.filter((id) => id === productId).length;
  };

  const cartTotal = cart.reduce((total, cartId) => {
    const product = products.find(
      (product) => product.id === cartId
    );

    return total + (product?.price ?? 0);
  }, 0);

  /* =========================
     DELIVERY
  ========================= */

  const deliveryCost =
    deliveryMethod === "Express Delivery"
      ? 7.90
      : 4.90;

  const orderTotal = cartTotal + deliveryCost;

  /* =========================
     SEARCH + CATEGORY
  ========================= */

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const selectCategory = (category: string) => {
    setSelectedCategory(category);

    document
      .getElementById("products")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  /* =========================
     PRODUCT PAGE
  ========================= */

  const openProduct = (productId: number) => {
    setSelectedProduct(productId);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  const selectedProductData = products.find(
    (product) => product.id === selectedProduct
  );

  /* =========================
     CHECKOUT
  ========================= */

  const openCheckout = () => {
    if (cart.length === 0) {
      return;
    }

    setCartOpen(false);
    setCheckoutOpen(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const placeOrder = () => {
    const trimmedName = customerName.trim();
    const trimmedEmail = customerEmail.trim();
    const trimmedPhone = customerPhone.trim();
    const trimmedAddress = address.trim();
    const trimmedCity = city.trim();
    const trimmedPostalCode = postalCode.trim();

    if (
      !trimmedName ||
      !trimmedEmail ||
      !trimmedPhone ||
      !trimmedAddress ||
      !trimmedCity ||
      !trimmedPostalCode
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    const phoneRegex = /^[+]?[-\d\s()]{7,20}$/;

    if (!phoneRegex.test(trimmedPhone)) {
      alert("Please enter a valid phone number.");
      return;
    }

    const postalCodeRegex = /^\d{5}$/;

    if (!postalCodeRegex.test(trimmedPostalCode)) {
      alert("Please enter a valid 5-digit Finnish postal code.");
      return;
    }

    const generatedOrderNumber = `DS-${new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "")}-${Math.floor(
      100000 + Math.random() * 900000
    )}`;

    setOrderNumber(generatedOrderNumber);
    setCheckoutOpen(false);
    setOrderComplete(true);
    setCart([]);
  };

  const closeOrderConfirmation = () => {
    setOrderComplete(false);

    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setAddress("");
    setCity("");
    setPostalCode("");
    setDeliveryMethod("Standard Delivery");
    setOrderNumber("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="store">

      {/* =========================
          HEADER
      ========================= */}

      <header className="header">

        <div
          className="logo"
          onClick={() => {
            closeProduct();
            setCheckoutOpen(false);
            setOrderComplete(false);
          }}
          style={{ cursor: "pointer" }}
        >
          YOUR STORE
        </div>

        <nav>

          <a
            href="#"
            onClick={() => {
              closeProduct();
              setCheckoutOpen(false);
              setOrderComplete(false);
            }}
          >
            Home
          </a>

          <a
            href="#products"
            onClick={() => {
              closeProduct();
              setCheckoutOpen(false);
              setOrderComplete(false);
            }}
          >
            Shop
          </a>

          <a
            href="#categories"
            onClick={() => {
              closeProduct();
              setCheckoutOpen(false);
              setOrderComplete(false);
            }}
          >
            Categories
          </a>

          <a
            href="#about"
            onClick={() => {
              closeProduct();
              setCheckoutOpen(false);
              setOrderComplete(false);
            }}
          >
            About
          </a>

        </nav>

        <div className="header-actions">

          <button
            className="search-button"
            onClick={() =>
              setSearchOpen(!searchOpen)
            }
          >
            🔍
          </button>

          <button
            className={`cart-button ${
              cartBump ? "cart-bump" : ""
            }`}
            onClick={() => setCartOpen(true)}
          >
            🛒 {cart.length}
          </button>

        </div>

      </header>

      {/* =========================
          SEARCH
      ========================= */}

      {searchOpen && (

        <div className="search-bar">

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            autoFocus
          />

          <button
            onClick={() => {
              setSearchTerm("");
              setSearchOpen(false);
            }}
          >
            ✕
          </button>

        </div>

      )}

      {/* =========================
          ORDER CONFIRMATION
      ========================= */}

      {orderComplete ? (

        <section className="order-confirmation">

          <div className="confirmation-card">

            <div className="confirmation-icon">
              ✓
            </div>

            <p className="section-label">
              ORDER CONFIRMED
            </p>

            <h1>
              Thank you, {customerName}!
            </h1>

            <p>
              Your order has been received.
              We'll use the contact details you provided
              to keep you updated about your delivery.
            </p>

            <div className="order-number">
              Order #
              {orderNumber}
            </div>

            <button
              className="shop-button"
              onClick={closeOrderConfirmation}
            >
              Continue Shopping →
            </button>

          </div>

        </section>

      ) : checkoutOpen ? (

        /* =========================
           CHECKOUT PAGE
        ========================= */

        <section className="checkout-page">

          <div className="checkout-container">

            <button
              className="back-button"
              onClick={() =>
                setCheckoutOpen(false)
              }
            >
              ← Back to Cart
            </button>

            <div className="checkout-heading">

              <p className="section-label">
                CHECKOUT
              </p>

              <h1>
                Complete your order.
              </h1>

              <p>
                Enter your details and choose your
                preferred delivery method.
              </p>

            </div>

            <div className="checkout-grid">

              {/* CUSTOMER DETAILS */}

              <div className="checkout-form">

                <div className="checkout-section">

                  <h2>
                    Contact Information
                  </h2>

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={customerName}
                    onChange={(event) =>
                      setCustomerName(event.target.value)
                    }
                    placeholder="Your full name"
                  />

                  <label>
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(event) =>
                      setCustomerEmail(event.target.value)
                    }
                    placeholder="you@example.com"
                  />

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(event) =>
                      setCustomerPhone(event.target.value)
                    }
                    placeholder="+358 ..."
                  />

                </div>

                <div className="checkout-section">

                  <h2>
                    Delivery Address
                  </h2>

                  <label>
                    Address
                  </label>

                  <input
                    type="text"
                    value={address}
                    onChange={(event) =>
                      setAddress(event.target.value)
                    }
                    placeholder="Street address"
                  />

                  <div className="checkout-row">

                    <div>

                      <label>
                        City
                      </label>

                      <input
                        type="text"
                        value={city}
                        onChange={(event) =>
                          setCity(event.target.value)
                        }
                        placeholder="Oulu"
                      />

                    </div>

                    <div>

                      <label>
                        Postal Code
                      </label>

                      <input
                        type="text"
                        value={postalCode}
                        onChange={(event) =>
                          setPostalCode(event.target.value)
                        }
                        placeholder="90100"
                      />

                    </div>

                  </div>

                </div>

                <div className="checkout-section">

                  <h2>
                    Delivery Method
                  </h2>

                  <label className="delivery-option">

                    <input
                      type="radio"
                      name="delivery"
                      checked={
                        deliveryMethod ===
                        "Standard Delivery"
                      }
                      onChange={() =>
                        setDeliveryMethod(
                          "Standard Delivery"
                        )
                      }
                    />

                    <span>

                      <strong>
                        Standard Delivery
                      </strong>

                      <small>
                        3–5 business days
                      </small>

                    </span>

                    <strong>
                      €4.90
                    </strong>

                  </label>

                  <label className="delivery-option">

                    <input
                      type="radio"
                      name="delivery"
                      checked={
                        deliveryMethod ===
                        "Express Delivery"
                      }
                      onChange={() =>
                        setDeliveryMethod(
                          "Express Delivery"
                        )
                      }
                    />

                    <span>

                      <strong>
                        Express Delivery
                      </strong>

                      <small>
                        1–2 business days
                      </small>

                    </span>

                    <strong>
                      €7.90
                    </strong>

                  </label>

                </div>

              </div>

              {/* ORDER SUMMARY */}

              <div className="checkout-summary">

                <h2>
                  Your Order
                </h2>

                <div className="checkout-items">

                  {products
                    .filter((product) =>
                      cart.includes(product.id)
                    )
                    .map((product) => {

                      const quantity =
                        getCartQuantity(product.id);

                      return (

                        <div
                          className="checkout-item"
                          key={product.id}
                        >

                          <img
                            src={product.image}
                            alt={product.name}
                          />

                          <div>

                            <h3>
                              {product.name}
                            </h3>

                            <p>
                              Qty: {quantity}
                            </p>

                          </div>

                          <strong>
                            €
                            {(
                              product.price *
                              quantity
                            ).toFixed(2)}
                          </strong>

                        </div>

                      );

                    })}

                </div>

                <div className="summary-line">

                  <span>
                    Subtotal
                  </span>

                  <strong>
                    €{cartTotal.toFixed(2)}
                  </strong>

                </div>

                <div className="summary-line">

                  <span>
                    Delivery
                  </span>

                  <strong>
                    €{deliveryCost.toFixed(2)}
                  </strong>

                </div>

                <div className="summary-total">

                  <span>
                    Total
                  </span>

                  <strong>
                    €{orderTotal.toFixed(2)}
                  </strong>

                </div>

                <button
                  className="place-order-button"
                  onClick={placeOrder}
                >
                  Place Order →
                </button>

                <p className="payment-note">
                  🔒 Your information is securely handled
                </p>

              </div>

            </div>

          </div>

        </section>

      ) : selectedProductData ? (

        /* =========================
           PRODUCT DETAIL PAGE
        ========================= */

        <section className="product-detail">

          <button
            className="back-button"
            onClick={closeProduct}
          >
            ← Back to products
          </button>

          <div className="product-detail-grid">

            <div className="product-detail-image">

              <img
                src={selectedProductData.image}
                alt={selectedProductData.name}
              />

            </div>

            <div className="product-detail-info">

              <span className="detail-category">
                {selectedProductData.category}
              </span>

              <h1>
                {selectedProductData.name}
              </h1>

              <div className="detail-rating">

                <span>
                  ★
                </span>

                <strong>
                  {selectedProductData.rating.toFixed(1)}
                </strong>

                <span className="rating-text">
                  Customer rating
                </span>

              </div>

              <div className="detail-price">
                €{selectedProductData.price.toFixed(2)}
              </div>

              <p className="detail-description">
                {selectedProductData.description}
              </p>

              <div className="detail-stock">

                {selectedProductData.stock > 10 ? (

                  <>
                    <span className="stock-dot" />
                    In stock
                  </>

                ) : (

                  <>
                    <span className="stock-dot low-stock" />
                    Only {selectedProductData.stock} left
                  </>

                )}

              </div>

              <div className="detail-actions">

                <button
                  className="detail-add-button"
                  onClick={() => {
                    addToCart(selectedProductData.id);
                    setCartOpen(true);
                  }}
                >
                  Add to Cart
                </button>

              </div>

              <div className="detail-features">

                <div>

                  <strong>
                    🇫🇮
                  </strong>

                  <span>
                    Finland-wide delivery
                  </span>

                </div>

                <div>

                  <strong>
                    ✓
                  </strong>

                  <span>
                    Carefully selected products
                  </span>

                </div>

                <div>

                  <strong>
                    ★
                  </strong>

                  <span>
                    Quality-focused store
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>

      ) : (

        <>

          {/* =========================
              HERO
          ========================= */}

          <section className="hero">

            <div className="hero-content">

              <p className="hero-small">
                NEW ARRIVALS
              </p>

              <h1>
                Discover products
                <br />
                you'll love.
              </h1>

              <p className="hero-description">
                Trending products, great prices and
                <br />
                delivery across Finland.
              </p>

              <button
                className="shop-button"
                onClick={() =>
                  document
                    .getElementById("products")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Shop Now →
              </button>

            </div>

          </section>

          {/* =========================
              CATEGORIES
          ========================= */}

          <section
            id="categories"
            className="categories"
          >

            <p className="section-label">
              EXPLORE
            </p>

            <h2>
              Shop by category
            </h2>

            <div className="category-grid">

              <button
                className={
                  selectedCategory === "All"
                    ? "category-card active"
                    : "category-card"
                }
                onClick={() =>
                  selectCategory("All")
                }
              >

                <h3>
                  All Products
                </h3>

                <p>
                  View everything.
                </p>

              </button>

              <button
                className={
                  selectedCategory === "Home & Living"
                    ? "category-card active"
                    : "category-card"
                }
                onClick={() =>
                  selectCategory("Home & Living")
                }
              >

                <h3>
                  Home & Living
                </h3>

                <p>
                  Make your home better.
                </p>

              </button>

              <button
                className={
                  selectedCategory === "Technology"
                    ? "category-card active"
                    : "category-card"
                }
                onClick={() =>
                  selectCategory("Technology")
                }
              >

                <h3>
                  Technology
                </h3>

                <p>
                  Smart products for everyday life.
                </p>

              </button>

              <button
                className={
                  selectedCategory === "Fitness"
                    ? "category-card active"
                    : "category-card"
                }
                onClick={() =>
                  selectCategory("Fitness")
                }
              >

                <h3>
                  Fitness
                </h3>

                <p>
                  Products for an active lifestyle.
                </p>

              </button>

              <button
                className={
                  selectedCategory === "Beauty"
                    ? "category-card active"
                    : "category-card"
                }
                onClick={() =>
                  selectCategory("Beauty")
                }
              >

                <h3>
                  Beauty
                </h3>

                <p>
                  Discover something new.
                </p>

              </button>

            </div>

          </section>

          {/* =========================
              PRODUCTS
          ========================= */}

          <section
            id="products"
            className="products"
          >

            <div className="products-heading">

              <div>

                <p className="section-label">
                  CURATED FOR YOU
                </p>

                <h2>
                  {selectedCategory === "All"
                    ? "Trending Products"
                    : selectedCategory}
                </h2>

              </div>

              <span className="product-count">
                {filteredProducts.length} products
              </span>

            </div>

            <div className="product-grid">

              {filteredProducts.length > 0 ? (

                filteredProducts.map(
                  (product) => (

                    <div
                      className="product-card"
                      key={product.id}
                      onClick={() =>
                        openProduct(product.id)
                      }
                    >

                      <div className="product-image">

                        <img
                          src={product.image}
                          alt={product.name}
                        />

                        <span className="product-category">
                          {product.category}
                        </span>

                        {product.stock <= 10 && (

                          <span className="stock-badge">
                            Only {product.stock} left
                          </span>

                        )}

                      </div>

                      <div className="product-info">

                        <h3>
                          {product.name}
                        </h3>

                        <div className="rating">

                          <span>
                            ★
                          </span>

                          <strong>
                            {product.rating.toFixed(1)}
                          </strong>

                        </div>

                        <p className="product-description">
                          {product.description}
                        </p>

                        <div className="product-bottom">

                          <div>

                            <span className="price">
                              €{product.price.toFixed(2)}
                            </span>

                            <span className="stock">
                              {product.stock} in stock
                            </span>

                          </div>

                          <button
                            className={`add-product ${
                              addButtonId === product.id
                                ? "add-product-added"
                                : ""
                            }`}
                            onClick={(event) => {

                              event.stopPropagation();

                              addToCart(product.id);

                            }}
                          >
                            +
                          </button>

                        </div>

                      </div>

                    </div>

                  )
                )

              ) : (

                <div className="no-results">

                  <h3>
                    No products found
                  </h3>

                  <p>
                    Try another search or category.
                  </p>

                </div>

              )}

            </div>

          </section>

          {/* =========================
              ABOUT
          ========================= */}

          <section
            id="about"
            className="about"
          >

            <p className="section-label">
              WHY CHOOSE US
            </p>

            <h2>
              Shopping made simple.
            </h2>

            <div className="about-grid">

              <div>

                <span className="about-icon">
                  🇫🇮
                </span>

                <h3>
                  Finland-wide Delivery
                </h3>

                <p>
                  We deliver products across Finland.
                </p>

              </div>

              <div>

                <span className="about-icon">
                  €
                </span>

                <h3>
                  Great Prices
                </h3>

                <p>
                  Carefully selected products at competitive prices.
                </p>

              </div>

              <div>

                <span className="about-icon">
                  ★
                </span>

                <h3>
                  Quality Products
                </h3>

                <p>
                  We focus on products worth buying.
                </p>

              </div>

            </div>

          </section>

          {/* =========================
              FOOTER
          ========================= */}

          <footer>

            <h2>
              YOUR STORE
            </h2>

            <p>
              Quality products. Great prices.
              Delivered across Finland.
            </p>

            <p>
              © 2026 Your Store
            </p>

          </footer>

        </>

      )}

      {/* =========================
          CART
      ========================= */}

      {cartOpen && (

        <div
          className="cart-overlay"
          onClick={() =>
            setCartOpen(false)
          }
        >

          <div
            className="cart-panel"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="cart-header">

              <h2>
                Your Cart
              </h2>

              <button
                className="close-cart"
                onClick={() =>
                  setCartOpen(false)
                }
              >
                ✕
              </button>

            </div>

            {cart.length === 0 ? (

              <div className="empty-cart">

                <div className="empty-cart-icon">
                  🛒
                </div>

                <h3>
                  Your cart is empty
                </h3>

                <p>
                  Add some products to get started.
                </p>

                <button
                  onClick={() =>
                    setCartOpen(false)
                  }
                >
                  Continue Shopping
                </button>

              </div>

            ) : (

              <>

                <div className="cart-items">

                  {products
                    .filter((product) =>
                      cart.includes(product.id)
                    )
                    .map((product) => {

                      const quantity =
                        getCartQuantity(product.id);

                      return (

                        <div
                          className="cart-item"
                          key={product.id}
                        >

                          <img
                            src={product.image}
                            alt={product.name}
                          />

                          <div className="cart-item-info">

                            <h3>
                              {product.name}
                            </h3>

                            <p>
                              €{product.price.toFixed(2)}
                            </p>

                            <div className="quantity-controls">

                              <button
                                onClick={() =>
                                  removeFromCart(
                                    product.id
                                  )
                                }
                              >
                                −
                              </button>

                              <span>
                                {quantity}
                              </span>

                              <button
                                onClick={() =>
                                  addToCart(
                                    product.id
                                  )
                                }
                              >
                                +
                              </button>

                            </div>

                          </div>

                        </div>

                      );

                    })}

                </div>

                <div className="cart-footer">

                  <div className="cart-total">

                    <span>
                      Total
                    </span>

                    <strong>
                      €{cartTotal.toFixed(2)}
                    </strong>

                  </div>

                  <button
                    className="checkout-button"
                    onClick={openCheckout}
                  >
                    Checkout →
                  </button>

                  <button
                    className="clear-cart"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>

                </div>

              </>

            )}

          </div>

        </div>

      )}

      {/* =========================
          CART FEEDBACK TOAST
      ========================= */}

      {addedProductName && (
        <div
          className="cart-toast"
          role="status"
          aria-live="polite"
        >
          <span className="cart-toast-icon">
            ✓
          </span>

          <span>
            {addedProductName} added to cart
          </span>
        </div>
      )}

    </div>
  );
}

export default App;