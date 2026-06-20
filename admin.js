const STORAGE_KEY = "wbStoreProducts";

// Тот же дефолтный список, что на клиентском сайте
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

function loadProducts() {
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
        console.error("Ошибка чтения из localStorage:", e);
        return defaultProducts.slice();
    }
}

function saveProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

let products = loadProducts();

const tableBody = document.getElementById("productsTableBody");
const addProductBtn = document.getElementById("addProductBtn");
const saveAllBtn = document.getElementById("saveAllBtn");
const resetDefaultsBtn = document.getElementById("resetDefaultsBtn");

// Рендер таблицы
function renderTable() {
    tableBody.innerHTML = "";

    products.forEach((p) => {
        const tr = document.createElement("tr");
        tr.dataset.id = p.id;

        const specsText = (p.specs || []).join("\n");

        tr.innerHTML = `
            <td class="id-cell">${p.id}</td>
            <td><input type="text" class="title" value="${p.title}"></td>
            <td><input type="text" class="brand" value="${p.brand}"></td>
            <td>
                <select class="category">
                    <option value="earphones" ${p.category === "earphones" ? "selected" : ""}>Наушники</option>
                    <option value="smartphones" ${p.category === "smartphones" ? "selected" : ""}>Смартфоны</option>
                    <option value="accessories" ${p.category === "accessories" ? "selected" : ""}>Аксессуары</option>
                    <option value="audio" ${p.category === "audio" ? "selected" : ""}>Аудио / колонки</option>
                </select>
            </td>
            <td><input type="number" class="price" value="${p.price}"></td>
            <td><input type="number" class="oldPrice" value="${p.oldPrice}"></td>
            <td><input type="number" class="popularity" value="${p.popularity ?? 1}"></td>
            <td><input type="text" class="image" value="${p.image}"></td>
            <td><textarea class="specs">${specsText}</textarea></td>
            <td class="action-cell">
                <button data-delete>Удалить</button>
            </td>
        `;

        tableBody.appendChild(tr);
    });
}

// Собрать данные из таблицы и сохранить
function collectAndSave() {
    const rows = tableBody.querySelectorAll("tr");
    const updated = [];

    rows.forEach(row => {
        const id = parseInt(row.dataset.id, 10);
        const title = row.querySelector(".title").value.trim() || "Без названия";
        const brand = row.querySelector(".brand").value.trim() || "NoName";
        const category = row.querySelector(".category").value;

        const price = parseInt(row.querySelector(".price").value, 10) || 0;
        const oldPrice = parseInt(row.querySelector(".oldPrice").value, 10) || price;
        const popularity = parseInt(row.querySelector(".popularity").value, 10) || 1;
        const image = row.querySelector(".image").value.trim() || "https://via.placeholder.com/400x300?text=No+Image";

        const specsText = row.querySelector(".specs").value;
        const specs = specsText
            .split("\n")
            .map(s => s.trim())
            .filter(Boolean);

        // ВАЖНО: рейтинг и отзывы не трогаем — оставляем как есть
        const existing = products.find(p => p.id === id) || {};
        const rating = existing.rating ?? 0;
        const reviews = existing.reviews ?? 0;

        updated.push({
            id,
            title,
            brand,
            category,
            price,
            oldPrice,
            rating,
            reviews,
            image,
            specs,
            popularity
        });
    });

    products = updated;
    saveProducts(products);
    alert("Изменения сохранены! Открой index.html и обнови страницу.");
}

// Добавить товар
function addProduct() {
    const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
    const newId = maxId + 1;

    const newProduct = {
        id: newId,
        title: "Новый товар",
        brand: "Brand",
        category: "earphones",
        price: 1000,
        oldPrice: 1200,
        rating: 0,
        reviews: 0,
        image: "https://via.placeholder.com/400x300?text=New+Product",
        specs: ["Характеристика 1", "Характеристика 2"],
        popularity: 1
    };

    products.push(newProduct);
    renderTable();
}

// Удаление товара
tableBody.addEventListener("click", (e) => {
    if (e.target.matches("[data-delete]")) {
        const row = e.target.closest("tr");
        const id = parseInt(row.dataset.id, 10);
        if (confirm(`Удалить товар ID ${id}?`)) {
            products = products.filter(p => p.id !== id);
            renderTable();
        }
    }
});

// Кнопки
addProductBtn.addEventListener("click", addProduct);
saveAllBtn.addEventListener("click", collectAndSave);
resetDefaultsBtn.addEventListener("click", () => {
    if (confirm("Точно сбросить на стандартный список товаров?")) {
        products = defaultProducts.slice();
        saveProducts(products);
        renderTable();
    }
});

// Старт
renderTable();
