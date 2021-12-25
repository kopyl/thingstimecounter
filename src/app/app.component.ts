import { Component, HostListener, ViewChild, EventEmitter } from '@angular/core';
import  { Todos } from './loadedTodos'
import { TodoComponent } from './modules/todo/todo-component/todo-component.component'
import { TotalTimeService } from './total-time.service'

import { Subject } from 'rxjs';


const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


const readClipboard = async () => {
    return await navigator.clipboard.readText()
}


interface appTodo {
    totalTime: TotalTimeService,

    durationText: string,
    delayToAppear: string,
    status: string,
    todoTitle: string,
    durationMs: number,
    todoToggled: Subject<any>,
    isRemoved?: boolean
}


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {

    @ViewChild('repaste') repaste: any

    appTodos: Array<appTodo> = []
    clipboard: string

    isTotalUpdating: boolean = false
    isTillTimeUpdating: boolean = false


    constructor(public totalTime: TotalTimeService) {}

    totalTimeView: any = {
        old: {...this.totalTime},
        new: {...this.totalTime},
    }

    timeTillView: any = {
        old: this.totalTime.timeTill,
        new: this.totalTime.timeTill
    }

    async changeTotalTime() {
        this.totalTimeView.new = {...this.totalTime}
        this.isTotalUpdating = true

        await sleep(100)
        this.totalTimeView.old = {...this.totalTime}
        this.isTotalUpdating = false
    }

    async refreshTimeTillView() {
        this.totalTime.recalculateDetails()
        await this.changeTimeTillView()

    }

    async changeTimeTillView() {
        if (!this.totalTime.isTimeTillChanged) return

        this.timeTillView.new = this.totalTime.timeTill
        this.isTillTimeUpdating = true

        await sleep(100)
        this.timeTillView.old = this.totalTime.getTimeTill()
        this.isTillTimeUpdating = false

    }


    async addTodosFromClipboard() {
        const clipboard = await readClipboard()
        this.removeAndAddTodos(clipboard)
    }


    async removeCurrentTodos() {

        for (const todo of this.appTodos) {
            todo.delayToAppear = '0ms'
            todo.isRemoved = true
        }
        await sleep(100)
        this.appTodos = []

    }


    async removeAndAddTodos(source: any) {

        if (!source.trim()) return

        if (this.appTodos.length) {
            this.removeCurrentTodos()
            await sleep(100)
        }

        this.addTodosToApp(source)

    }


    addTodosToApp(source: any) {

        const todosObj = new Todos(source)

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
        if (!this.totalTime.isChanged) return
        this.changeTotalTime()
        this.changeTimeTillView()
    }


    @HostListener('window:keydown', ['$event'])
    cmdV(event: KeyboardEvent) {
        if (!(event.metaKey && event.key == "v")) return
        this.addTodosFromClipboard()
    }


    async onDragOver(event: DragEvent) {
        event.preventDefault()

        const text = event.dataTransfer?.getData('text')
        this.removeAndAddTodos(text)
    }


}
