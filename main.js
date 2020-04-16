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
        todos: []
    },
    methods: {
        // ToDo 追加の処理
        doAdd(event, value) {
            const comment = this.$refs.comment

            // 入力がなければ何もしないで return
            if (!comment.value.length) return

            // {新しいID, コメント, 作業状態}
            // というオブジェクトを現在の todos リストへ push
            // 作業状態「state」はデフォルト「作業中=0」で作成
            this.todos.push({
                id: todoStorage.uid++,
                comment: comment.value,
                state: 0
            })

            // フォーム要素を空にする
            comment.value = ''
        },
        // 状態変更の処理
        doChangeState(item) {
            item.state = item.state ? 0 : 1
        },
        // 削除の処理
        doRemove(item) {
            const index = this.todos.indexOf(item)
            this.todos.splice(index, 1)
        }
    },
    watch: {
        // オプションを使う場合はオブジェクト形式にする
        todos: {
            // 引数はウォッチしているプロパティの変更後の値
            handler(todos) {
                todoStorage.save(todos)
            },
            // deep オプションでネストしているデータも監視できる
            deep: true
        }
    },
    created() {
        // インスタンス生成時に自動的に fetch() する
        this.todos = todoStorage.fetch()
    }
})