// calendar.js


function parseDateFromString(dateString) {
    // Разбиваем строку на части
    const parts = dateString.split(' ');

    // Получаем числовое значение дня
    const day = parseInt(parts[0], 10);

    // Получаем месяц
    const month = parts[1];

    // Получаем год
    const year = parseInt(parts[3], 10);

    // Получаем время
    const time = parts[5];

    // Собираем новую строку в формате, который может быть распознан конструктором Date
    const newDateString = `${month} ${day}, ${year} ${time}`;

    // Создаем объект Date из новой строки
    const parsedDate = new Date(newDateString);

    return parsedDate;
}


const dateString = "21 марта 2024 г. в 10:00";
const taskDate = parseDateFromString(dateString);


const taskDay = taskDate.getDate();


console.log(dateString, taskDate);



const months = [
    "Январь", "Февраль", "Март",
    "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь",
    "Октябрь", "Ноябрь", "Декабрь"
];

let currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

function displayTasksOnCalendar(tasks) {
    const daysContainer = document.querySelector(".days");

    // Очистите предыдущие квадратики
    const taskSquares = document.querySelectorAll(".task-square");
    taskSquares.forEach(square => square.remove());

    // Получите последний день текущего месяца
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Создайте квадратики для каждой задачи и добавьте их в соответствующий день
    tasks.forEach(task => {
        const customDate = task.time;
        const taskDate = new Date(customDate);
        const taskDay = taskDate.getDate();
        const dayDiv = daysContainer.querySelector(`[data-day="${taskDay}"]`);
		
		console.log(dayDiv, taskDate.getMonth(), currentMonth);
        if (dayDiv && taskDate.getMonth() == currentMonth) {
            const taskSquare = document.createElement("div");
    taskSquare.classList.add("task-square");
    taskSquare.textContent = task.title;

    // Добавьте обработчик события для открытия деталей задачи
    dayDiv.addEventListener("click", function (event) {
        const taskSquare = event.target.closest(".task-square");

        if (taskSquare) {
            // Получите соответствующую задачу
            const task = tasks.find(t => t.title === taskSquare.textContent);

            // Если задача найдена, откройте детали задачи
            if (task) {
                openTaskDetails(task.title, task.description, task.deadline);
            }
        }
    });

    dayDiv.appendChild(taskSquare);
        }
    });
}

function openTaskDetails(title, description, deadline) {
    const overlay = document.querySelector(".task-details-overlay");
    const titleElement = document.getElementById("details-title");
    const descriptionElement = document.getElementById("details-description");
    const deadlineElement = document.getElementById("details-deadline");

    titleElement.textContent = title;
    descriptionElement.textContent = description;
    deadlineElement.textContent = `Дедлайн: ${deadline}`;

    overlay.style.display = "flex";
}

function closeTaskDetails() {
    const overlay = document.querySelector(".task-details-overlay");
    overlay.style.display = "none";
}



function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    displayCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    displayCalendar();
}

function displayCalendar() {
    const calendarHeader = document.querySelector(".current-month");
    calendarHeader.textContent = `${months[currentMonth]} ${currentYear}`;

    // Получите контейнер для дней месяца
    const daysContainer = document.querySelector(".days");

    // Очистите предыдущие дни
    daysContainer.innerHTML = "";

    // Получите последний день текущего месяца
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Создайте div-ы для каждого дня месяца
    for (let day = 1; day <= lastDayOfMonth; day++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        dayDiv.setAttribute("data-day", day);
        dayDiv.textContent = day;

        //  обработчик события, чтобы открывать задачи при клике на день
        dayDiv.addEventListener("click", function () {
            openTaskDetails(day);
        });

        // Добавьте div-ы в контейнер дней месяца
        daysContainer.appendChild(dayDiv);
    }

    // Здесь получаем задачи из локального хранилища
    let tasks = localStorage.getItem("tasks");

    // Проверка, является ли tasks массивом
    if (tasks) {
        try {
            tasks = JSON.parse(tasks);
        } catch (error) {
            console.error("Error parsing tasks from localStorage:", error);
            tasks = [];
        }
    } else {
        tasks = [];
    }

    // Выведем в консоль для проверки
    console.log("Tasks:", tasks);

    // Вызываем функцию отображения задач на календаре, передавая массив задач
    displayTasksOnCalendar(tasks);
}


// Функция для сохранения текущей темы в локальном хранилище
function saveThemePreference() {
    const body = document.body;
    localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
}

// Функция для загрузки темы при запуске страницы
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeToggle.checked = true; // Установка состояния чекбокса
    }
}

// Загрузка темы при запуске страницы
document.addEventListener('DOMContentLoaded', loadThemePreference);

// Функция для переключения темы
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');
    saveThemePreference();
	console.log('THEME HAS CHAHNGED');
	themeToggle.checked = body.classList.contains('light-theme');

}


// Функция для открытия окна настроек
function openSettings() {
    document.getElementById('settingsOverlay').style.display = 'block';
	console.log("Открыто");
}

function closeSettings() {
    document.getElementById('settingsOverlay').style.display = 'none';
}

// Получаем тумблер по id и добавляем обработчик событий
const themeToggle = document.getElementById('toggleCheckbox');
themeToggle.addEventListener('change', toggleTheme);

// Вызовите функцию отображения календаря при загрузке страницы
window.addEventListener("load", displayCalendar);



