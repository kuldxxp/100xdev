document.addEventListener('DOMContentLoaded', function() {
    const addTaskButtons = document.querySelectorAll('.add-task-btn');

    addTaskButtons.forEach((button) => {
        button.addEventListener('click', function() {
            const column = this.parentElement;
            const taskList = column.querySelector('.task-list');

            createTaskForm(taskList, button);
        });
    });

    const taskLists = document.querySelectorAll('.task-list');

    taskLists.forEach((taskList) => {
        setupDropZone(taskList);
    });

    initializeSampleTasks();
    updateAllTaskCounts();
});

function createTaskForm(taskList, button) {
    button.disabled = true;
    button.textContent = 'Adding Task...';

    const formContainer = document.createElement('div');
    formContainer.className = 'task-form'

    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.className = 'task-input';
    titleInput.placeholder = 'Enter task title...';
    titleInput.maxLength = 50;

    const descTextArea = document.createElement('textarea');
    descTextArea.className = 'task-textarea';
    descTextArea.placeholder = 'Enter task description (optional)...';
    descTextArea.maxLength = 200;

    const saveButton = document.createElement('button');
    saveButton.className = 'save-task-btn';
    saveButton.textContent = 'Save Task';

    const cancelButton = document.createElement('button');
    cancelButton.className = 'cancel-task-btn';
    cancelButton.textContent = 'Cancel';

    formContainer.appendChild(titleInput);
    formContainer.appendChild(descTextArea);
    formContainer.appendChild(saveButton);
    formContainer.appendChild(cancelButton);

    taskList.appendChild(formContainer);

    titleInput.focus();

    saveButton.addEventListener('click', function() {
        const title = titleInput.value.trim();

        if (title === '') {
            alert('Please enter a new title');
            return;
        }

        createTask(taskList, title, descTextArea.value.trim());

        taskList.removeChild(formContainer);
        resetAddButton(button);
    });

    cancelButton.addEventListener('click', function() {
        taskList.removeChild(formContainer);
        resetAddButton(button);
    });

    titleInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveButton.click();
        }
    });
}

function createTask(taskList, title, description) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    taskDiv.draggable = true;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '×';
    deleteBtn.title ='Delete task';

    deleteBtn.addEventListener('click', function(e) {
        e.stopPropagation;

        if (confirm('Are you sure you want to delete this task?')) {
            taskDiv.style.animation = 'slideout 0.3s ease-in forwards';

            setTimeout(() => {
                taskDiv.remove();
                updateAllTaskCounts();
            }, 300);
        }
    });

    const titleElement = document.createElement('h3');
    titleElement.textContent = title;

    taskDiv.appendChild(deleteBtn);
    taskDiv.appendChild(titleElement);

    if (description) {
        const descElement = document.createElement('p');
        descElement.textContent = description;
        taskDiv.appendChild(descElement);
    }

    setupTaskDragEvent(taskDiv);

    taskList.appendChild(taskDiv);

    updateAllTaskCounts();
}

function resetAddButton(button) {
    button.disabled = false;
    button.textContent = '+ Add Task';
} 

function setupTaskDragEvent(taskElement) {
    taskElement.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', '');

        window.draggedElement = this;

        this.classList.add('dragging');

        console.log('Started Dragging:', this.querySelector('h3').textContent);
    });

    taskElement.addEventListener('dragend', function(e) {
        this.classList.remove('dragging');

        window.draggedElement = null;

        console.log('Finished dragging');
    });
}

function setupDropZone(taskList) {
    taskList.addEventListener('dragover', function(e) {
        e.preventDefault();

        this.classList.add('drag-over');
    });

    taskList.addEventListener('dragleave', function(e) {
        if (!this.contains(e.relatedTarget)) {
            this.classList.remove('drag-over');
        }
    });

    taskList.addEventListener('drop', function(e) {
        e.preventDefault();

        this.classList.remove('drag-over');

        const draggedTask = window.draggedElement;

        if (draggedTask) {
            this.appendChild(draggedTask);

            const taskTitle = draggedTask.querySelector('h3').textContent;
            const columnName = this.parentElement.querySelector('h2').textContent;

            console.log(`Moved "${taskTitle} to ${columnName}"`);

            updateAllTaskCounts();
        }
    });
}

function updateAllTaskCounts() {
    const columns = [
        { listId: 'todo-list', countId: 'todo-count' },
        { listId: 'progress-list', countId: 'progress-count' },
        { listId: 'done-list', countId: 'done-count' }
    ];
    
    columns.forEach((column) => {
        const taskList = document.getElementById(column.listId);
        const countElement = document.getElementById(column.countId);
        const taskCount = taskList.querySelectorAll('.task').length;

        countElement.textContent = taskCount;

        updateEmptyState(taskList, taskCount);
    });
}

function updateEmptyState(taskList, taskCount) {
    const existingEmptyState = taskList.querySelector('.empty-state');
    if (existingEmptyState) {
        existingEmptyState.remove();
    }
    
    if (taskCount === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.textContent = 'No tasks yet. Click "Add Task" to get started!';
        taskList.appendChild(emptyState);
    }
}

function initializeSampleTasks() {
    const todoList = document.getElementById('todo-list');
    const progressList = document.getElementById('progress-list');
    const doneList = document.getElementById('done-list');
    
    createTask(todoList, 'Plan project architecture', 'Define the overall structure and components of the new application.');
    createTask(todoList, 'Set up development environment', 'Install necessary tools and configure the workspace.');
    
    createTask(progressList, 'Implement user authentication', 'Build login/logout functionality with secure session management.');
    
    createTask(doneList, 'Create project repository', 'Set up Git repository with initial project structure.');
    createTask(doneList, 'Design database schema', 'Plan and document the database tables and relationships.');
}

const style = document.createElement('style');

style.textContent = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: transformX(0);
        } to {
            opacity: 0;
            transform: transformX(100px);
        }
    }
`;

document.head.appendChild(style);