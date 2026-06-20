// Те же ключи и дефолтные товары, что и на основном сайте
const STORAGE_KEY = "wbStoreProducts";
const REGION_KEY = "wbStoreRegion";
const ADDRESS_KEY = "wbStoreAddress";

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
        image: "https://via.placeholder.com/800x600?text=AirPods+2",
        specs: [
            "Оригинальный дизайн Apple",
            "Bluetooth 5.0",
            "До 5 часов работы без подзарядки",
            "Кейс с проводной зарядкой"
        ],
        description: "Оригинальные беспроводные наушники AirPods 2 — удобство, качество и стабильное соединение с устройствами Apple.",
        conditions: [
            "Минимальный заказ: от 1 шт",
            "Доставка по Кыргызстану через курьерские службы",
            "Оплата: при получении или онлайн переводом"
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
        image: "https://via.placeholder.com/800x600?text=AirPods+Pro+2",
        specs: [
            "Активное шумоподавление",
            "Прозрачный режим",
            "До 6 часов работы",
            "Беспроводной кейс"
        ],
        description: "AirPods Pro 2 с активным шумоподавлением и прозрачным режимом для комфортного прослушивания в любых условиях.",
        conditions: [
            "Минимальный заказ: от 1 шт",
            "Возможность опта по запросу",
            "Обмен/возврат по договорённости"
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
        image: "https://via.placeholder.com/800x600?text=ViRON+PRO+X10",
        specs: [
            "Bluetooth 5.3",
            "До 4 часов работы",
            "Шумоподавление ENC",
            "USB-C зарядка"
        ],
        description: "ViRON PRO X10 — доступные TWS-наушники с современным чипом Bluetooth 5.3 и системой ENC для чистого звука.",
        conditions: [
            "Минимальный заказ: от 1 шт",
            "Опт доступен при заказе от 10 шт",
            "Гарантия 3 месяца"
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
        image: "https://via.placeholder.com/800x600?text=iPhone+14",
        specs: [
            "Дисплей 6.1\" OLED",
            "Камера 12 Мп",
            "Поддержка 5G",
            "Face ID"
        ],
        description: "iPhone 14 с дисплеем OLED, отличной камерой и поддержкой 5G — надёжный выбор для работы и развлечений.",
        conditions: [
            "Минимальный заказ: от 1 шт",
            "Проверка устройства при получении",
            "Гарантия 1 год от продавца"
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
        image: "https://via.placeholder.com/800x600?text=SoundBox",
        specs: [
            "Мощность 20 Вт",
            "Защита IPX5",
            "До 10 часов работы",
            "Bluetooth 5.0"
        ],
        description: "Портативная колонка ViRON PRO SoundBox — громкий, чистый звук и защита IPX5 для активного отдыха.",
        conditions: [
            "Минимальный заказ: от 1 шт",
            "Доставка по всей стране",
            "Возможен самовывоз из пункта выдачи"
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
        image: "https://via.placeholder.com/800x600?text=20W+Charger",
        specs: [
            "Мощность 20 Вт",
            "USB-C выход",
            "Поддержка быстрой зарядки",
            "Компактный размер"
        ],
        description: "Быстрое зарядное устройство 20Вт USB-C подходит для современных смартфонов и планшетов.",
        conditions: [
            "Минимальный заказ: от 1 шт",
            "Смена/возврат при заводском браке",
            "Опт по запросу"
        ],
        popularity: 6
    }
];

function loadProductsFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultProducts.slice();
    try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        return defaultProducts.slice();
    } catch {
        return defaultProducts.slice();
    }
}

let products = loadProductsFromStorage();

// DOM
const pdImage       = document.getElementById("pdImage");
const pdTitle       = document.getElementById("pdTitle");
const pdBrand       = document.getElementById("pdBrand");
const pdRating      = document.getElementById("pdRating");
const pdPrice       = document.getElementById("pdPrice");
const pdOldPrice    = document.getElementById("pdOldPrice");
const pdSpecs       = document.getElementById("pdSpecs");
const pdDescription = document.getElementById("pdDescription");
const pdConditions  = document.getElementById("pdConditions");

const pdBrandMeta   = document.getElementById("pdBrandMeta");
const pdCategoryMeta= document.getElementById("pdCategoryMeta");
const pdIdMeta      = document.getElementById("pdIdMeta");

const pdRegionText  = document.getElementById("pdRegionText");
const pdAddressText = document.getElementById("pdAddressText");

const cartCountEl   = document.getElementById("cartCount");
const regionSelect  = document.getElementById("regionSelect");
const addressInput  = document.getElementById("addressInput");

const pdAddToCart   = document.getElementById("pdAddToCart");
const pdOrder       = document.getElementById("pdOrder");
const pdDeliveryBtn = document.getElementById("pdDeliveryBtn");

let cartCount = 0;
let currentProduct = null;

/* ----- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ----- */

function getCategoryLabel(code) {
    switch (code) {
        case "earphones":   return "Наушники";
        case "smartphones": return "Смартфоны";
        case "accessories": return "Аксессуары";
        case "audio":       return "Аудио / колонки";
        default:            return "Электроника";
    }
}

function getDeliveryText(region) {
    switch (region) {
        case "Бишкек":
        case "Чуй":
            return "1–2 дня";
        case "Ош":
        case "Джалал-Абад":
            return "2–3 дня";
        case "Баткен":
        case "Нарын":
        case "Талас":
        case "Иссык-Куль":
            return "3–5 дней";
        default:
            return "2–5 дней";
    }
}

/* ----- ЛОКАЦИЯ ----- */

function initLocation() {
    const savedRegion = localStorage.getItem(REGION_KEY);
    if (savedRegion && regionSelect) {
        regionSelect.value = savedRegion;
        pdRegionText.textContent = savedRegion;
    } else if (regionSelect) {
        pdRegionText.textContent = regionSelect.value;
    }

    if (regionSelect) {
        regionSelect.addEventListener("change", () => {
            const value = regionSelect.value;
            localStorage.setItem(REGION_KEY, value);
            pdRegionText.textContent = value;
            updateDeliveryButton();
        });
    }

    const savedAddress = localStorage.getItem(ADDRESS_KEY);
    if (savedAddress && addressInput) {
        addressInput.value = savedAddress;
        pdAddressText.textContent = savedAddress;
    } else {
        pdAddressText.textContent = savedAddress || "укажите адрес вверху";
    }

    const saveAddress = () => {
        const value = addressInput.value.trim();
        localStorage.setItem(ADDRESS_KEY, value);
        pdAddressText.textContent = value || "укажите адрес вверху";
    };

    if (addressInput) {
        addressInput.addEventListener("change", saveAddress);
        addressInput.addEventListener("blur", saveAddress);
    }

    updateDeliveryButton();
}

function updateDeliveryButton() {
    const region = regionSelect ? regionSelect.value : "Кыргызстан";
    const text = getDeliveryText(region);
    pdDeliveryBtn.textContent = `Срок доставки: ${text}`;
}

/* ----- ПРОДУКТ ----- */

function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"), 10);
    return isNaN(id) ? null : id;
}

function renderProduct() {
    const id = getProductIdFromUrl();
    if (!id) {
        pdTitle.textContent = "Товар не найден";
        return;
    }

    const product = products.find(p => p.id === id);
    if (!product) {
        pdTitle.textContent = "Товар не найден";
        return;
    }

    currentProduct = product;

    pdImage.src = product.image;
    pdImage.alt = product.title;

    pdTitle.textContent = product.title;
    pdBrand.textContent = product.brand;
    pdRating.textContent = `⭐ ${(product.rating ?? 0).toFixed(1)} · ${(product.reviews ?? 0).toLocaleString("ru-RU")} отзывов`;

    pdPrice.textContent = product.price.toLocaleString("ru-RU") + " сом";
    pdOldPrice.textContent = product.oldPrice.toLocaleString("ru-RU") + " сом";

    pdBrandMeta.textContent = product.brand;
    pdCategoryMeta.textContent = getCategoryLabel(product.category);
    pdIdMeta.textContent = product.id;

    const desc = product.description ||
        "Описание этого товара будет добавлено позже. Свяжитесь с менеджером для подробной консультации.";
    pdDescription.textContent = desc;

    const conds = product.conditions && product.conditions.length
        ? product.conditions
        : [
            "Минимальный заказ: от 1 шт",
            "Доставка по всей территории Кыргызстана",
            "Оплата при получении или онлайн"
        ];
    pdConditions.innerHTML = "";
    conds.forEach(c => {
        const li = document.createElement("li");
        li.textContent = c;
        pdConditions.appendChild(li);
    });

    pdSpecs.innerHTML = "";
    (product.specs || []).forEach(spec => {
        const li = document.createElement("li");
        li.textContent = spec;
        pdSpecs.appendChild(li);
    });
}

function updateCartCount() {
    cartCountEl.textContent = cartCount;
}

/* ----- СОБЫТИЯ КНОПОК ----- */

pdAddToCart.addEventListener("click", () => {
    if (!currentProduct) return;
    cartCount++;
    updateCartCount();
});

pdOrder.addEventListener("click", () => {
    if (!currentProduct) return;
    cartCount++;
    updateCartCount();
    alert("Заявка на заказ оформлена. Менеджер свяжется с вами для подтверждения.");
});

// Умная кнопка "Назад"
const goBackBtn = document.getElementById("goBackBtn");

if (goBackBtn) {
    goBackBtn.addEventListener("click", () => {
        if (window.history.length > 1) {
            history.back();
        } else {
            window.location.href = "index.html";
        }
    });
}

/* ----- СТАРТ ----- */
renderProduct();
initLocation();
updateCartCount();
