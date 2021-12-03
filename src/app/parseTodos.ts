import { ParseTodo } from './parseTodo'

export class ParseTodos {

    constructor(private string: string) {
    }

    todos: Array<any> = this.getTodos()


    getTodos() {
        let allLines: Array<string> = this.string.split("\n")
        allLines = allLines.map(line => line.trim())
        allLines = allLines.filter(line => line)
        let todos = allLines.map(
            line => new ParseTodo(line)
            .todo
        )
        todos = todos.filter(todo => todo.text)
        return todos
    }

}
