import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';

@Component({
    selector: 'toggle',
    templateUrl: './toggle.component.html',
    styleUrls: ['./toggle.component.sass']
})
export class ToggleComponent implements OnInit {

    constructor() { }

    @HostBinding('class.disabled')
    @Input('disabled') disabled: boolean

    ngOnInit(): void {
    }

}
