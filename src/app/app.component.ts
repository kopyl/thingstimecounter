import { Component, HostListener } from '@angular/core';
import  { ParseTodos } from './parseTodos'

interface appTodo {
    title: string,
    duration: string,
    delayToAppear: string,
    isRemoved: boolean
}


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {

    loadedTodos: Array<appTodo> = []
    appTodos: Array<appTodo> = []
    clipboard: string


    addTodosFromClipboard() {

        if (this.appTodos.length) {
            this.removeCurrentTodos()
            setTimeout(() => (
                navigator.clipboard.readText()
                .then(e => this.loadTodos(e) )
            ), 100)
        } else {
            navigator.clipboard.readText()
            .then(e => this.loadTodos(e) )
        }

    }


    removeCurrentTodos() {

        for (const todo of this.appTodos) {
            todo.delayToAppear = '0ms'
            todo.isRemoved = true
        }
        setTimeout(() => (this.appTodos = []), 100)
    }


    addTodosToApp() {

        for (const todo of this.loadedTodos) {
            this.appTodos.push(todo)
        }

    }


    loadTodos(source: any) {

        this.loadedTodos = []

        const parsedTodos = new ParseTodos(source)

        for (const todo of parsedTodos.todos) {

            const loadedTodo: any = {
                title: todo.text,
                isRemoved: false
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
            let delay: delay = this.loadedTodos.length*10
            delay = `${delay}ms`
            loadedTodo.delayToAppear = delay

            this.loadedTodos.push(loadedTodo)

        }

        this.addTodosToApp()

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
                this.loadTodos(text)
            ), 100)
        } else {
            this.loadTodos(text)
        }

    }


}
