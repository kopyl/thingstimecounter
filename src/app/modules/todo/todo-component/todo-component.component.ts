import {
    AfterViewInit,
    Component,
    HostBinding,
    Input,
    ViewChild,
    HostListener,
} from '@angular/core';



@Component({
    selector: 'todo-component',
    templateUrl: './todo-component.component.html',
    styleUrls: ['./todo-component.component.sass']
})
export class TodoComponent implements AfterViewInit {

    constructor() { }

    @Input('todoTitle') todoTitle: string
    @Input('duration') durationText: string = "1m"

    @ViewChild('duration') duration: any
    @ViewChild('toggle') toggle: any

    @HostBinding('class')
    @Input('status') status: string = "normal"


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
    }

    reloadState() {
        this.status == "disabled" ?
        this.disable() :
        this.enable()
    }

    ngAfterViewInit(): void {
        this.reloadState()
    }


}