let gems = 16000;
const gemDisplay = document.getElementById('gem-count');
const resultName = document.getElementById('result-name');
const resultRarity = document.getElementById('result-rarity');
const historyList = document.getElementById('history-list');
const silhouette = document.querySelector('.character-silhouette');

// База данных персонажей/оружия
const pool = [
    { name: "Дехья", rarity: 4, type: "Персонаж" },
    { name: "Беннет", rarity: 4, type: "Персонаж" },
    { name: "Сян Лин", rarity: 4, type: "Персонаж" },
    { name: "Фишль", rarity: 4, type: "Персонаж" },
    { name: "Ржавый лук", rarity: 3, type: "Оружие" },
    { name: "Эпос о драконоборцах", rarity: 3, type: "Оружие" },
    { name: "Ху Тао", rarity: 5, type: "Персонаж" }, // Легендарка
    { name: "Навида", rarity: 5, type: "Персонаж" }, // Легендарка
    { name: "Неувиллет", rarity: 5, type: "Персонаж" } // Легендарка
];

function updateGems(amount) {
    gems += amount;
    gemDisplay.innerText = gems;
    if (gems < 0) {
        alert("Недостаточно примогемов! Иди фармить!");
        gems += Math.abs(amount); // Возвращаем как было
        gemDisplay.innerText = gems;
        return false;
    }
    return true;
}

function getRandomItem() {
    // Шансы: 3* (60%), 4* (30%), 5* (10%) - упрощенно
    const rand = Math.random() * 100;
    let rarity;
    
    if (rand < 60) rarity = 3;
    else if (rand < 90) rarity = 4;
    else rarity = 5;

    // Фильтруем пул по редкости
    const itemsOfRarity = pool.filter(item => item.rarity === rarity);
    return itemsOfRarity[Math.floor(Math.random() * itemsOfRarity.length)];
}

function addItemToHistory(item) {
    const li = document.createElement('li');
    li.innerHTML = `<span class="rarity-${item.rarity}">★${item.rarity}</span> ${item.name}`;
    historyList.prepend(li);
}

function animateWish(item) {
    // Сброс анимации
    silhouette.style.transform = "scale(0.8)";
    silhouette.style.opacity = "0";
    
    setTimeout(() => {
        resultName.innerText = item.name;
        resultName.className = `rarity-${item.rarity}`;
        
        resultRarity.innerText = `${item.type} | ★${item.rarity}`;
        resultRarity.className = `rarity-${item.rarity}`;
        
        silhouette.style.transform = "scale(1)";
        silhouette.style.opacity = "1";
        
        // Эффект свечения в зависимости от редкости
        let glowColor = '';
        if(item.rarity === 3) glowColor = 'rgba(60, 156, 247, 0.5)';
        if(item.rarity === 4) glowColor = 'rgba(162, 86, 225, 0.6)';
        if(item.rarity === 5) glowColor = 'rgba(255, 177, 63, 0.8)';
        
        silhouette.style.boxShadow = `0 0 50px ${glowColor}`;
        silhouette.style.borderColor = glowColor;
        
    }, 200);
}

function wish(amount) {
    const cost = amount * 160;
    if (!updateGems(-cost)) return;

    for (let i = 0; i < amount; i++) {
        const item = getRandomItem();
        addItemToHistory(item);
        
        // Если это последний предмет в пачке, показываем его крупно
        if (i === amount - 1) {
            animateWish(item);
        }
    }
}