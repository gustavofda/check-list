const toggle = document.getElementById('themeToggle');
const body = document.body;

// Alterna entre modos claro e escuro
function toggleTheme() {
    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    } else {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    }
}

// Verifica e aplica o tema salvo no localStorage ao carregar
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        if (toggle) toggle.checked = true; // Certifique-se de que o toggle esteja no estado correto
    }
    loadTasks();
});

// Adiciona evento de mudança ao toggle
if (toggle) {
    toggle.addEventListener('change', toggleTheme);
}

// Salva as tarefas no Local Storage
function saveTasks() {
    const tasks = [];
    const taskInputs = document.querySelectorAll(".task-input");
    taskInputs.forEach(input => {
        if (input.value.trim()) {
            tasks.push(input.value.trim());
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Carrega as tarefas do Local Storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const checklist = document.querySelector(".checklist");
    checklist.innerHTML = ""; // Limpa a lista existente

    tasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.classList.add("item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const taskInput = document.createElement("input");
        taskInput.type = "text";
        taskInput.classList.add("task-input");
        taskInput.value = task;

        const removeBtn = document.createElement("button");
        removeBtn.innerText = "Remover";
        removeBtn.classList.add("remove-btn");
        removeBtn.onclick = () => {
            taskItem.remove();
            saveTasks();
        };

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskInput);
        taskItem.appendChild(removeBtn);
        checklist.appendChild(taskItem);
    });
}

// Adiciona uma nova tarefa
document.querySelector(".add-btn").addEventListener("click", () => {
    const checklist = document.querySelector(".checklist");
    const taskItem = document.createElement("div");
    taskItem.classList.add("item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.classList.add("task-input");
    taskInput.placeholder = "Escreva sua tarefa aqui...";

    const removeBtn = document.createElement("button");
    removeBtn.innerText = "Remover";
    removeBtn.classList.add("remove-btn");
    removeBtn.onclick = () => {
        taskItem.remove();
        saveTasks();
    };

    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskInput);
    taskItem.appendChild(removeBtn);
    checklist.appendChild(taskItem);
    saveTasks(); // Salva imediatamente após adicionar a nova tarefa
});

// Salva as tarefas quando o input de tarefa for alterado
document.querySelector(".checklist").addEventListener("input", saveTasks);
