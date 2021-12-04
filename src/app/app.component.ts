import { Component, HostListener } from '@angular/core';
import  { Todos } from './loadedTodos'
import { TodoComponent } from './modules/todo/todo-component/todo-component.component'
import { TotalTimeService } from './total-time.service'

interface appTodo {
    title: string,
    duration: string,
    delayToAppear?: string,
    isRemoved?: boolean,
    rawDurationMs?: number
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {

    loadedTodos: Array<appTodo> = []
    // appTodos: Array<appTodo> = []
    appTodos: Array<any> = []
    clipboard: string


    constructor(private totalTime: TotalTimeService) {}


    addTodosFromClipboard() {

        if (this.appTodos.length) {
            this.removeCurrentTodos()
            setTimeout(() => (
                navigator.clipboard.readText()
                .then(e => this.addTodosToApp(e) )
            ), 100)
        } else {
            navigator.clipboard.readText()
            .then(e => this.addTodosToApp(e) )
        }

    }


    removeCurrentTodos() {

        for (const todo of this.appTodos) {
            todo.delayToAppear = '0ms'
            todo.isRemoved = true
        }
        setTimeout(() => (this.appTodos = []), 100)
    }


    addTodosToApp(source: any) {

        const todosObj = new Todos(source)

        this.totalTime.seconds = todosObj.totalTime.seconds


        // console.log(todosObj);

        console.log(this.totalTime.hours, this.totalTime.minutes)
        // console.log(this.totalTime.seconds)



        for (const todo of todosObj.todos) {

            // console.log(todo);

            const todoComponent = new TodoComponent(this.totalTime)
            todoComponent.todoTitle = todo.title
            todoComponent.durationText = todo.duration
            todoComponent.durationMs = todo.rawDurationMs!
            todoComponent.delayToAppear = todo.delayToAppear!
            this.appTodos.push(todoComponent)
        }


    }


    @HostListener('window:keydown', ['$event'])
    cmdV(event: KeyboardEvent) {

        if (event.metaKey && event.key == "v") {
            this.addTodosFromClipboard()
        }


    }


    @HostListener('click') // TEST
    onClick() {
        // this.removeCurrentTodos()
    }

    onDragOver(event: DragEvent) {
        event.preventDefault()

        const text = event.dataTransfer?.getData('text')
        if (!text) return

        if (this.appTodos.length) {
            this.removeCurrentTodos()
            setTimeout(() => (
                this.addTodosToApp(text)
            ), 100)
        } else {
            this.addTodosToApp(text)
        }

    }


}
