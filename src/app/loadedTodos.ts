import  { ParseTodos } from './parseTodos'


interface appTodo {
    title: string,
    duration: string,
    delayToAppear?: string,
    isRemoved?: boolean,
    rawDurationMs?: number
}




export class Todos {
    public todos: Array<appTodo> = []
    public totalTimeMs = 0

    public parsedTodos = new ParseTodos(this.source)

    constructor(private source: any){
        this.getFromParsed()
        console.log(this.parsedTodos)
    }

    getFromParsed() {



        for (const todo of this.parsedTodos.todos) {

            const loadedTodo: appTodo = {
                title: todo.text,
                isRemoved: false,
                duration: "",
                rawDurationMs: 0
            }

            const time = todo.time
            const durationList = []
            if (time.hours) {
                durationList.push(`${time.hours}h`)
            }
            if (time.minutes) {
                durationList.push(`${time.minutes}m`)
            }
            loadedTodo.duration = durationList.join(" ")

            type delay = number | string
            let delay: delay = this.todos.length*10
            delay = `${delay}ms`
            loadedTodo.delayToAppear = delay


            loadedTodo.rawDurationMs = todo.time.seconds


            this.todos.push(loadedTodo)

        }
    }
}
