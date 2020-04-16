// https://jp.vuejs.org/v2/examples/todomvc.html
const STORAGE_KEY = 'todos-vuejs-demo'
let todoStorage = {
    fetch() {
        const todos = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || '[]'
        )

        todos.forEach((todo, index) => {
            todo.id = index
        })
        todoStorage.uid = todos.length

        return todos
    },
    save(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}

const app = new Vue({
    el: '#app',
    data: {
        // 使用するデータ
    },
    methods: {
        // 使用するメソッド
    }
})