// Run when the page is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Step 2: Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Step 3: Define addTask function
    function addTask() {
        // Get and trim the input value
        const taskText = taskInput.value.trim();

        // Check if task is empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); // ✅ use classList.add

        // Step 4: Remove task when remove button is clicked
        removeButton.onclick = function () {
            taskList.removeChild(li);
        };

        // Append remove button to li, and li to the task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";
    }

    // Step 5: Add event listeners
    addButton.addEventListener('click', addTask);

    // Allow pressing "Enter" to add task
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});