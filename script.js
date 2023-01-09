const formDiv = document.getElementById('form')
const inputEl = document.getElementById('input')
const ulDiv = document.querySelector('ul')
const showTodoBtn = document.getElementById('show-todo')

const todos = JSON.parse(localStorage.getItem('todo'))

if (todos && todos.length) {
    todos.forEach(todo => {
        createTodo(todo)
    })
}


formDiv.addEventListener('submit', e => {
    e.preventDefault()

    createTodo()
})

function createTodo(lsTodo = null) {
    if (inputEl.value || lsTodo) {
        const todo = document.createElement('li')

        if (lsTodo) {
            todo.textContent = lsTodo.text
            if (lsTodo.isDone)
                todo.classList.toggle('done')
        }
        else
            todo.textContent = inputEl.value

        todo.addEventListener('click', () => {
            todo.classList.toggle('done')

            updateLocalStorage()
        })

        todo.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            if (todo.classList.contains('done')) {
                todo.remove()
                updateLocalStorage()
            }
        })

        ulDiv.appendChild(todo)

        inputEl.value = ''

        updateLocalStorage()
    }
}

function updateLocalStorage() {
    const todoAllEl = document.querySelectorAll('li')

    let todo = []

    todoAllEl.forEach(todoEl => {
        todo.push({
            text: todoEl.textContent,
            isDone: todoEl.classList.contains('done')
        })
    })

    localStorage.setItem('todo', JSON.stringify(todo))
}