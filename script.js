// Ключи для localStorage
const STORAGE_KEY = "wbStoreProducts";
const REGION_KEY = "wbStoreRegion";
const ADDRESS_KEY = "wbStoreAddress";

// Дефолтный список товаров (если в localStorage пусто)
const defaultProducts = [
    {
        id: 1,
        title: "Беспроводные наушники AirPods 2",
        brand: "Apple",
        category: "earphones",
        price: 8990,
        oldPrice: 10990,
        rating: 4.9,
        reviews: 1243,
        image: "https://via.placeholder.com/400x300?text=AirPods+2",
        specs: [
            "Оригинальный дизайн Apple",
            "Bluetooth 5.0",
            "До 5 часов работы без подзарядки",
            "Кейс с проводной зарядкой"
        ],
        popularity: 10
    },
    {
        id: 2,
        title: "Беспроводные наушники AirPods Pro 2",
        brand: "Apple",
        category: "earphones",
        price: 13990,
        oldPrice: 16990,
        rating: 4.8,
        reviews: 768,
        image: "https://via.placeholder.com/400x300?text=AirPods+Pro+2",
        specs: [
            "Активное шумоподавление",
            "Прозрачный режим",
            "До 6 часов работы",
            "Беспроводной кейс"
        ],
        popularity: 9
    },
    {
        id: 3,
        title: "TWS наушники ViRON PRO X10",
        brand: "ViRON PRO",
        category: "earphones",
        price: 2490,
        oldPrice: 3490,
        rating: 4.7,
        reviews: 312,
        image: "https://via.placeholder.com/400x300?text=ViRON+PRO+X10",
        specs: [
            "Bluetooth 5.3",
            "До 4 часов работы",
            "Шумоподавление ENC",
            "USB-C зарядка"
        ],
        popularity: 8
    },
    {
        id: 4,
        title: "Смартфон iPhone 14 128 ГБ",
        brand: "Apple",
        category: "smartphones",
        price: 59990,
        oldPrice: 64990,
        rating: 4.9,
        reviews: 452,
        image: "https://via.placeholder.com/400x300?text=iPhone+14",
        specs: [
            "Дисплей 6.1\" OLED",
            "Камера 12 Мп",
            "Поддержка 5G",
            "Face ID"
        ],
        popularity: 10
    },
    {
        id: 5,
        title: "Bluetooth колонка ViRON PRO SoundBox",
        brand: "ViRON PRO",
        category: "audio",
        price: 3290,
        oldPrice: 4290,
        rating: 4.6,
        reviews: 189,
        image: "https://via.placeholder.com/400x300?text=SoundBox",
        specs: [
            "Мощность 20 Вт",
            "Защита IPX5",
            "До 10 часов работы",
            "Bluetooth 5.0"
        ],
        popularity: 7
    },
    {
        id: 6,
        title: "Сетевое зарядное устройство 20Вт USB-C",
        brand: "V-Puls",
        category: "accessories",
        price: 790,
        oldPrice: 1290,
        rating: 4.5,
        reviews: 98,
        image: "https://via.placeholder.com/400x300?text=20W+Charger",
        specs: [
            "Мощность 20 Вт",
            "USB-C выход",
            "Поддержка быстрой зарядки",
            "Компактный размер"
        ],
        popularity: 6
    }
];

// Загрузка товаров из localStorage
function loadProductsFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
        return defaultProducts.slice();
    }
    try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
        }
        return defaultProducts.slice();
    } catch (e) {
        console.error("Ошибка чтения товаров из localStorage:", e);
        return defaultProducts.slice();
    }
}

// Рабочий массив товаров
let products = loadProductsFromStorage();

// Состояние
let cartCount = 0;
let currentCategory = "all";
let currentSearch = "";
let currentMaxPrice = null;
let currentSort = "popularity";

// DOM элементы
const productList   = document.getElementById("productList");
const categoryList  = document.getElementById("categoryList");
const cartCountEl   = document.getElementById("cartCount");
const maxPriceInput = document.getElementById("maxPrice");
const applyFilterBtn = document.getElementById("applyFilter");
const clearFilterBtn = document.getElementById("clearFilter");
const sortSelect    = document.getElementById("sortSelect");
const searchInput   = document.getElementById("searchInput");
const searchBtn     = document.getElementById("searchBtn");
const regionSelect  = document.getElementById("regionSelect");
const addressInput  = document.getElementById("addressInput");

// Модалка
const modal         = document.getElementById("productModal");
const modalOverlay  = document.getElementById("modalOverlay");
const modalClose    = document.getElementById("modalClose");
const modalImage    = document.getElementById("modalImage");
const modalTitle    = document.getElementById("modalTitle");
const modalBrand    = document.getElementById("modalBrand");
const modalPrice    = document.getElementById("modalPrice");
const modalOldPrice = document.getElementById("modalOldPrice");
const modalRating   = document.getElementById("modalRating");
const modalSpecs    = document.getElementById("modalSpecs");
const modalAddToCart = document.getElementById("modalAddToCart");

let modalProductId = null;

/* ----------- ЛОКАЦИЯ (ОБЛАСТЬ + АДРЕС) ----------- */

function initLocation() {
    if (regionSelect) {
        const savedRegion = localStorage.getItem(REGION_KEY);
        if (savedRegion) {
            regionSelect.value = savedRegion;
        }
        regionSelect.addEventListener("change", () => {
            localStorage.setItem(REGION_KEY, regionSelect.value);
        });
    }

    if (addressInput) {
        const savedAddress = localStorage.getItem(ADDRESS_KEY);
        if (savedAddress) {
            addressInput.value = savedAddress;
        }
        const saveAddress = () => {
            localStorage.setItem(ADDRESS_KEY, addressInput.value.trim());
        };
        addressInput.addEventListener("change", saveAddress);
        addressInput.addEventListener("blur", saveAddress);
    }
}

/* ----------- РЕНДЕР ТОВАРОВ ----------- */

function getFilteredProducts() {
    let result = products.slice();

    // Категория
    if (currentCategory !== "all") {
        result = result.filter(p => p.category === currentCategory);
    }

    // Поиск
    if (currentSearch.trim() !== "") {
        const q = currentSearch.trim().toLowerCase();
        result = result.filter(p =>
            p.title.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q)
        );
    }

    // Цена
    if (currentMaxPrice) {
        result = result.filter(p => p.price <= currentMaxPrice);
    }

    // Сортировка
    if (currentSort === "price-asc") {
        result.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-desc") {
        result.sort((a, b) => b.price - a.price);
    } else if (currentSort === "popularity") {
        result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }

    return result;
}

function renderProducts() {
    const filtered = getFilteredProducts();
    productList.innerHTML = "";

    if (filtered.length === 0) {
        productList.innerHTML = "<p>Товары не найдены. Измени фильтры или запрос.</p>";
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";
        card.dataset.id = product.id;

        card.innerHTML = `
            <div class="product-card__image-wrap">
                <img src="${product.image}" alt="${product.title}" class="product-card__image">
            </div>
            <div class="product-card__brand">${product.brand}</div>
            <h2 class="product-card__title">${product.title}</h2>
            <div class="product-card__bottom">
                <div class="product-card__price-block">
                    <span class="product-card__price-main">${product.price.toLocaleString("ru-RU")} сом</span>
                    <span class="product-card__price-old">${product.oldPrice.toLocaleString("ru-RU")} сом</span>
                </div>
                <div>
                    <div class="product-card__rating">
                        ⭐ ${(product.rating ?? 0).toFixed(1)} · ${(product.reviews ?? 0).toLocaleString("ru-RU")} отзывов
                    </div>
                    <button class="product-card__btn" data-add-to-cart>В корзину</button>
                </div>
            </div>
        `;

        productList.appendChild(card);
    });
}

function updateCartCount() {
    cartCountEl.textContent = cartCount;
}

/* ----------- МОДАЛЬНОЕ ОКНО ----------- */

function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    modalProductId = product.id;
    modalImage.src = product.image;
    modalImage.alt = product.title;
    modalTitle.textContent = product.title;
    modalBrand.textContent = product.brand;
    modalPrice.textContent = product.price.toLocaleString("ru-RU") + " сом";
    modalOldPrice.textContent = product.oldPrice.toLocaleString("ru-RU") + " сом";
    modalRating.textContent = `⭐ ${(product.rating ?? 0).toFixed(1)} · ${(product.reviews ?? 0).toLocaleString("ru-RU")} отзывов`;

    modalSpecs.innerHTML = "";
    (product.specs || []).forEach(spec => {
        const li = document.createElement("li");
        li.textContent = spec;
        modalSpecs.appendChild(li);
    });

    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
    modalProductId = null;
}

/* ----------- СОБЫТИЯ ----------- */

// Категории
categoryList.addEventListener("click", (e) => {
    const item = e.target.closest(".sidebar__item");
    if (!item) return;

    categoryList.querySelectorAll(".sidebar__item")
        .forEach(el => el.classList.remove("sidebar__item--active"));
    item.classList.add("sidebar__item--active");

    currentCategory = item.dataset.category;
    renderProducts();
});

// Фильтр по цене
applyFilterBtn.addEventListener("click", () => {
    const value = parseInt(maxPriceInput.value, 10);
    currentMaxPrice = isNaN(value) ? null : value;
    renderProducts();
});

clearFilterBtn.addEventListener("click", () => {
    maxPriceInput.value = "";
    currentMaxPrice = null;
    renderProducts();
});

// Сортировка
sortSelect.addEventListener("change", () => {
    currentSort = sortSelect.value;
    renderProducts();
});

// Поиск
function applySearch() {
    currentSearch = searchInput.value;
    renderProducts();
}

searchBtn.addEventListener("click", applySearch);

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        applySearch();
    }
});

// Клик по карточкам
productList.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;
    const id = parseInt(card.dataset.id, 10);

    // Если клик по "В корзину" – не уходим со страницы
    if (e.target.matches("[data-add-to-cart]")) {
        cartCount++;
        updateCartCount();
        return;
    }

    // Переход на отдельную страницу товара
    window.location.href = `product.html?id=${id}`;
});


// Модалка
modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

modalAddToCart.addEventListener("click", () => {
    if (!modalProductId) return;
    cartCount++;
    updateCartCount();
});

/* ----------- ИНИЦИАЛИЗАЦИЯ ----------- */

renderProducts();
updateCartCount();
initLocation();
