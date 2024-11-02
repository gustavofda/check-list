// Alterna entre modos claro e escuro
function toggleTheme() {
    const body = document.body;
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
        document.body.classList.add("dark-mode");
    }
    loadTasks();
});

// Salva as tarefas no Local Storage
function saveTasks() {
    const tasks = [];
    const taskInputs = document.querySelectorAll(".task-input");

    taskInputs.forEach(input => {
        tasks.push(input.value);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    alert("Tarefas salvas com sucesso!");
}

// Carrega as tarefas do Local Storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    if (tasks) {
        const checklist = document.querySelector(".checklist");
        tasks.forEach(task => {
            const item = document.createElement("div");
            item.classList.add("item");
            item.innerHTML = `<input type="checkbox"><input type="text" placeholder="Escreva sua tarefa aqui" class="task-input" value="${task}">`;
            checklist.appendChild(item);
        });
    }
}

// Função para adicionar uma nova tarefa
function addTask() {
    // Cria um novo div para a nova tarefa
    const newItem = document.createElement('div');
    newItem.classList.add('item'); // Adiciona a classe 'item' para estilização

    // Cria o checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    // Cria a caixa de texto
    const taskInput = document.createElement('input');
    taskInput.type = 'text';
    taskInput.placeholder = 'Escreva sua tarefa aqui';
    taskInput.classList.add('task-input'); // Adiciona a classe 'task-input'

    // Adiciona o checkbox e a caixa de texto ao novo div
    newItem.appendChild(checkbox);
    newItem.appendChild(taskInput);

    // Adiciona o novo item à checklist
    document.querySelector('.checklist').appendChild(newItem);
}

