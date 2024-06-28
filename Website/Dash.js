function lastTasks() {
    const taskList = document.querySelector(".task-list");
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
		
		
        const tasksArray = JSON.parse(savedTasks);
		tasksArray.sort((a, b) => new Date(b.time) - new Date(a.time));

        // Берем только первые три задачи
        const latestTasks = tasksArray.slice(0, 3);

        latestTasks.forEach(task => {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task");

            const titleHeading = document.createElement("h3");
            titleHeading.textContent = task.title;

            const descriptionParagraph = document.createElement("p");
            descriptionParagraph.textContent = task.description;

            const deadlineParagraph = document.createElement("p");
            deadlineParagraph.classList.add("deadline");
            const deadlineDate = new Date(task.deadline);
			deadlineParagraph.textContent = `Дедлайн: ${formatRussianDate(task.deadline)}`;		
            taskDiv.appendChild(titleHeading);
            taskDiv.appendChild(descriptionParagraph);
            taskDiv.appendChild(deadlineParagraph);
            taskList.appendChild(taskDiv);
        });
    }
}

function displayTodayTasks() {
    const taskList = document.querySelector(".today-tasks");
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        const tasksArray = JSON.parse(savedTasks);

        // Сортируем задачи по времени
        tasksArray.sort((taskA, taskB) => {
            const timeA = new Date(taskA.time).getTime();
            const timeB = new Date(taskB.time).getTime();

            return timeA - timeB;
        });

        tasksArray.forEach(task => {
            const taskDate = new Date(task.time);
            const today = new Date();

            // Сравниваем год, месяц, день задачи и текущей даты
            const isToday = (
                taskDate.getFullYear() === today.getFullYear() &&
                taskDate.getMonth() === today.getMonth() &&
                taskDate.getDate() === today.getDate()
            );

            if (isToday) {
                const taskDiv = document.createElement("div");
                taskDiv.classList.add("task");

                const titleHeading = document.createElement("h3");
                titleHeading.textContent = task.title;

                const descriptionParagraph = document.createElement("p");
                descriptionParagraph.textContent = task.description;

                const deadlineParagraph = document.createElement("p");
                deadlineParagraph.classList.add("deadline");
                deadlineParagraph.textContent = `Дедлайн: ${formatRussianDate(task.deadline)}`;

                taskDiv.appendChild(titleHeading);
                taskDiv.appendChild(descriptionParagraph);
                taskDiv.appendChild(deadlineParagraph);
                taskList.appendChild(taskDiv);
            }
        });
    } else {
        console.log('Локальное хранилище пусто');
    }
}





function formatRussianDate(date) {
    return date.toLocaleString('ru-RU', { dateStyle: 'long', timeStyle: 'short' });
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


window.addEventListener("load", lastTasks);
window.addEventListener("load", displayTodayTasks);
