import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';

@Component({
    selector: 'duration',
    templateUrl: './duration.component.html',
    styleUrls: ['./duration.component.sass']
})
export class DurationComponent implements OnInit {

    constructor() {}

    @Input('duration') duration: string

    @HostBinding('class.crossed')
    @Input('crossed') crossed: boolean



    ngOnInit(): void {
    }

}
