// Run when the page is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // ---- Load tasks from Local Storage ----
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); 
        // false = don't re-save to avoid duplicates
    }

    // ---- Save tasks to Local Storage ----
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            // li.firstChild is the text node containing the task text
            tasks.push(li.firstChild.textContent.trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // ---- Add a task to the list ----
    function addTask(taskText, save = true) {
        // If taskText is undefined, use the value from the input
        if (typeof taskText !== 'string') {
            taskText = taskInput.value.trim();
        }

        // Validate
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Remove task when clicked
        removeButton.onclick = function () {
            taskList.removeChild(li);
            saveTasks(); // Update Local Storage after removal
        };

        // Append remove button to li
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Save new task if required
        if (save) {
            saveTasks();
        }

        // Clear input field
        taskInput.value = "";
    }

    // ---- Event listeners ----
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // ---- Load stored tasks on page load ----
    loadTasks();
});