import { Component, HostListener, ViewChild } from '@angular/core';
import  { Todos } from './loadedTodos'
import { TodoComponent } from './modules/todo/todo-component/todo-component.component'
import { TotalTimeService } from './total-time.service'


const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const readClipboard = async () => {
    return await navigator.clipboard.readText()
}


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

    appTodos: Array<any> = []
    clipboard: string

    isTotalUpdating: boolean = false
    isTillTimeUpdating: boolean = false


    constructor(public totalTime: TotalTimeService) {}

    totalTimeView: any = {
        old: {...this.totalTime},
        new: {...this.totalTime},
    }

    timeTillView: any = {
        old: this.totalTime.getTimeTill(),
        new: this.totalTime.getTimeTill()
    }

    changeTotalTime() {

        this.totalTimeView.new = {...this.totalTime}
        this.isTotalUpdating = true

        setTimeout(() => {
            this.totalTimeView.old = {...this.totalTime}
            this.isTotalUpdating = false
        }, 100 )

    }

    changeTimeTillView() {

        this.timeTillView.new = this.totalTime.getTimeTill()
        this.isTillTimeUpdating = true


        setTimeout(() => {
            this.timeTillView.old = this.totalTime.getTimeTill()
            this.isTillTimeUpdating = false
        }, 100 )

    }


    async addTodosFromClipboard() {

        const clipboard = await readClipboard()

        if (this.appTodos.length) {
            this.removeCurrentTodos()
            await sleep(100)
        }

        this.addTodosToApp(clipboard)

    }


    removeCurrentTodos() {


        for (const todo of this.appTodos) {
            todo.delayToAppear = '0ms'
            todo.isRemoved = true
        }
        setTimeout(() => (this.appTodos = []), 100)
    }


    addTodosToApp(source: any) {

        // if (!this.appTodos.length) return



        const todosObj = new Todos(source)
        // console.log("ok", todosObj.todos);
        // console.log("source", source);
        if (!todosObj.todos.length) return
        // if (!source.trim()) return

        this.totalTime.seconds = todosObj.totalTime.seconds

        if (this.totalTime.isChanged) {
            this.changeTotalTime()
        }

        this.changeTimeTillView()

        for (const todo of todosObj.todos) {
            const todoComponent = new TodoComponent(this.totalTime)
            todoComponent.todoTitle = todo.title
            todoComponent.durationText = todo.duration
            todoComponent.durationMs = todo.rawDurationMs!
            todoComponent.delayToAppear = todo.delayToAppear!
            this.appTodos.push(todoComponent)
        }


    }

    reactOnTodoToggle() {
        if (this.totalTime.isChanged) {
            this.changeTotalTime()
        }
        this.changeTimeTillView()
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
