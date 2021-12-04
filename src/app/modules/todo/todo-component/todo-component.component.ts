import {
    AfterViewInit,
    Component,
    HostBinding,
    Input,
    ViewChild,
    HostListener,
    EventEmitter, Output
} from '@angular/core';

import { TotalTimeService } from '../../../total-time.service'



@Component({
    selector: 'todo-component',
    templateUrl: './todo-component.component.html',
    styleUrls: ['./todo-component.component.sass']
})
export class TodoComponent implements AfterViewInit {

    constructor(private totalTime: TotalTimeService) { }

    @Input('todoTitle') todoTitle: string
    @Input('durationMs') durationMs: number
    @Input('duration') durationText: string = "1m"
    @Input('delayToAppear') delayToAppear: string = "1m"

    @ViewChild('duration') duration: any
    @ViewChild('toggle') toggle: any

    @HostBinding('class')
    @Input('status') status: string = "normal"

    @Output() todoToggled = new EventEmitter();



    @HostListener('click') click(event: Event) {
        this.switchState()
    }

    disable() {
        this.status = "disabled"
        this.toggle.disabled = true
        this.duration.crossed = true
    }

    enable() {
        this.status = "normal"
        this.toggle.disabled = false
        this.duration.crossed = false
    }

    switchState() {
        this.status == "normal" ?
        this.disable() :
        this.enable()

        // this.totalTime.recalculate(this.status)

        // const beforeChangeData = JSON.stringify(this.totalTime)

        this.totalTime.recalculate(this.status, this.durationMs)

        // const afterChangeData = JSON.stringify(this.totalTime)

        // if (beforeChangeData === afterChangeData) return

        // if (!this.totalTime.isChanged) return

        this.todoToggled.emit()

    }

    reloadState() {
        this.status == "disabled" ?
        this.disable() :
        this.enable()
    }

    ngAfterViewInit(): void {
        this.reloadState()

        // console.log(this.durationMs)

    }


}
