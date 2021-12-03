import { ParseTodo } from './parseTodo'

export class ParseTodos {

    constructor(private string: string) {
    }

    todos: Array<any> = this.getTodos()

    totalTime: any = this.getTotalTime()


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

    getTotalTime(){
        const totalTime: any = {}

        totalTime.seconds = this.todos.reduce(
            (prev, curr) => {
                prev.time.seconds =
                prev.time.seconds +
                curr.time.seconds
                return prev
            },
            {time: {seconds: 0 }}
        ).time.seconds

        console.log(totalTime.seconds)

        return totalTime


    }

}
