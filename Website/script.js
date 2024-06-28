function openTaskForm() {
    document.getElementById("taskFormOverlay").style.display = "flex";
}

function closeTaskForm() {
    document.getElementById("taskFormOverlay").style.display = "none";
    resetTaskForm();
}

function getTime(a) {
	
	return new Date(a.value)
}

function deleteTask(taskDiv) {
    const taskList = document.querySelector(".task-list");
    taskList.removeChild(taskDiv);
    saveTasks();
}

function formatRussianDate(date) {
    return date.toLocaleString('ru-RU', { dateStyle: 'long', timeStyle: 'short' });
}

function addTask(event) {
    event.preventDefault();
    const taskTitle = document.getElementById("taskTitle").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskDeadlineInput = document.getElementById("taskDeadline");
    const taskDeadlineDate = new Date(taskDeadlineInput.value);
    const taskTime = document.getElementById("taskTime").value; // Получаем значение времени

    // Устанавливаем время в дату дедлайна
    const taskDeadline = new Date(
        taskDeadlineDate.getFullYear(),
        taskDeadlineDate.getMonth(),
        taskDeadlineDate.getDate(),
        parseInt(taskTime.split(':')[0]),  // Часы из времени
        parseInt(taskTime.split(':')[1])   // Минуты из времени
    );


    if (taskTitle && taskDescription && taskDeadline && !isNaN(taskDeadline.getTime())) {
        const taskList = document.querySelector(".task-list");

        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");

        const titleHeading = document.createElement("h3");
        titleHeading.textContent = taskTitle;

        const descriptionParagraph = document.createElement("p");
        descriptionParagraph.textContent = taskDescription;

        const deadlineParagraph = document.createElement("p");
        deadlineParagraph.classList.add("deadline");
        deadlineParagraph.textContent = `Дедлайн: ${formatRussianDate(taskDeadline)}`;
		
		const deadlineTime = document.createElement("p");
		deadlineTime.classList.add("deadlineTime");
		deadlineTime.textContent = taskDeadline.toISOString();
		
        const deleteIcon = document.createElement("img");
        deleteIcon.src = "trash-icon.png"; 
        deleteIcon.alt = "Удалить";
        deleteIcon.classList.add("delete-button");
        deleteIcon.addEventListener("click", function () {
            deleteTask(taskDiv);
        });

        taskDiv.appendChild(titleHeading);
        taskDiv.appendChild(descriptionParagraph);
        taskDiv.appendChild(deadlineParagraph);
        taskDiv.appendChild(deleteIcon);
		taskDiv.appendChild(deadlineTime);
        taskList.appendChild(taskDiv);

        // Сохраняем задачу в локальное хранилище
        saveTasks();
		deadlineParagraph.textContent = `Дедлайн: ${formatRussianDate(taskDeadline)}`;
		console.log(taskDeadline, '= add');
        closeTaskForm();
    } else {
        alert("Заполните все поля формы корректно");
    }
}

function saveTasks() {
    const taskList = document.querySelector(".task-list");
    const tasks = Array.from(taskList.children).map(taskDiv => {
        const title = taskDiv.querySelector('h3').textContent;
        const description = taskDiv.querySelector('p').textContent;
        const deadline = taskDiv.querySelector('.deadline').textContent.replace('Дедлайн: ', '');
		const time = taskDiv.querySelector('.deadlineTime').textContent;
		console.log(time, '= save1');
        return { title, description, deadline, time};
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));


}



function loadTasks() {
    const taskList = document.querySelector(".task-list");
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        const tasksArray = JSON.parse(savedTasks);

        tasksArray.forEach(task => {
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

			
			const deadlineTime = document.createElement("p");
			deadlineTime.classList.add("deadlineTime");
			deadlineTime.textContent = task.time;			
			console.log(task.time, 'time')
			
            const deleteIcon = document.createElement("img");
            deleteIcon.src = "trash-icon.png";
            deleteIcon.alt = "Удалить";
            deleteIcon.classList.add("delete-button");
            deleteIcon.addEventListener("click", function () {
                deleteTask(taskDiv);
            });

            taskDiv.appendChild(titleHeading);
            taskDiv.appendChild(descriptionParagraph);
            taskDiv.appendChild(deadlineParagraph);
            taskDiv.appendChild(deadlineTime); // Добавляем deadlineTime в taskDiv
            taskDiv.appendChild(deleteIcon);
            taskList.appendChild(taskDiv);
			console.log(deadlineDate, '= load');

        });
    }
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

// Вызываем функцию загрузки при загрузке страницы
window.addEventListener("load", loadTasks);

function resetTaskForm() {
    document.getElementById("taskForm").reset();
}