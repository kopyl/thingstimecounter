import { Component, HostListener, ViewChild } from '@angular/core';
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

    @ViewChild('repaste') repaste: any

    loadedTodos: Array<appTodo> = []
    appTodos: Array<any> = []
    clipboard: string

    isHeaderUpdating: boolean = false


    constructor(public totalTime: TotalTimeService) {}

    totalTimeView: any = {
        old: {...this.totalTime},
        new: {...this.totalTime},
    }

    changeTotalTime() {

        this.totalTimeView.new = {...this.totalTime}
        this.isHeaderUpdating = true

        setTimeout(() => {
            this.totalTimeView.old = {...this.totalTime}
            this.isHeaderUpdating = false
        }, 100 )

    }


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

        if (this.totalTime.isChanged) {
            this.changeTotalTime()
        }

        for (const todo of todosObj.todos) {
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
