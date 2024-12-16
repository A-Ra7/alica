// Предметы
const items = [
    { id: 1, x: 30, y: 160 },
    { id: 2, x: 130, y: 220 },
    { id: 3, x: 210, y: 190 },
    { id: 4, x: 250, y: 140 },
    { id: 5, x: 300, y: 190 },
    { id: 6, x: 260, y: 240 },
    { id: 7, x: 70, y: 300 },
    { id: 8, x: 170, y: 330 },
];

// Название предмета
const itemName = "Абсолем -";

const gameContainer = document.getElementById('game-container');
const itemList = document.getElementById('itemList');

const min = 1;
const max = items.length;
const itemX = Math.floor(Math.random() * (max - min + 1)) + min;
let itemNumber = 1;

// Создаём предмет
items.forEach(item => {
    const target = document.createElement('div');

    if (item.id == itemX) {
        target.className = 'target-x';
    }
    else {
        target.className = 'target';

        // Создаём список предметов
        const listItem = document.createElement('div');
        listItem.textContent = itemName + " " + itemNumber;
        itemNumber ++;
        listItem.id = 'item-' + item.id;
        itemList.appendChild(listItem);
    }
    
    target.style.left = item.x + 'px';
    target.style.top = item.y + 'px';
    gameContainer.appendChild(target);
    
    // Проверяем предметы
    target.addEventListener('click', () => {
        target.style.display = 'none';

        //Нашли предмет Х
        if (target.className.includes('target-x')) {
            document.querySelectorAll('.target').forEach(target => {
                target.style.display = 'none';
             });
            let gameBg = document.getElementById('game-bg');
            gameBg.style.opacity = '0.7';
            const krasnaja = document.getElementById('krasnaja');
            krasnaja.style.display = 'block';
            const gameButton = document.getElementById('game-button');
            gameButton.style.display = 'block';
            setTimeout("alert('Ты попался Красной королеве «Голову с плеч!»')", 1000); 
            return
        }

        // Вычёркиваем предмет из списка
        document.getElementById('item-' + item.id).classList.add('found');

        // Нашли все предметы без предмета Х
        const foundItems = document.querySelectorAll('.found').length;
        if (foundItems === (items.length - 1)) {
            document.querySelectorAll('.target-x').forEach(targetX => {
                targetX.style.display = 'none';
                let gameBg = document.getElementById('game-bg');
                gameBg.style.opacity = '0.7';
                const victory = document.getElementById('victory');
                victory.style.display = 'block';
                const gameButton = document.getElementById('game-button');
                gameButton.style.display = 'block';
            });
            setTimeout("alert('Победа! Ты нашел Алису: «Увидимся в Стране чудес»')", 1000); 
        }
    });
});

// Прелоадер
window.onload = function () {
    let preloader = document.getElementById('preloader-container');
    if (!preloader.classList.contains('loaded')) {
        preloader.classList.add('loaded');
    }

    let gameBg = document.getElementById('game-bg');
    if (!gameBg.classList.contains('enter')) {
        gameBg.classList.add('enter');
    }

    document.querySelectorAll('.target').forEach(target => {
        if (!target.classList.contains('fall')) {
            target.classList.add('fall');
        }
     });

    document.querySelectorAll('.target-x').forEach(targetX => {
        if (!targetX.classList.contains('fall')) {
            targetX.classList.add('fall');
        }
    });
}

function restartGame () {
    window.location.reload();
}
