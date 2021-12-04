import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TotalTimeService {

    _seconds: number = 0
    hours: number = 0
    minutes: number = 0

    get seconds() {
        return this._seconds
    }

    set seconds(value) {
        this._seconds = value
        this.recalculateDetails()
    }

    constructor() {
        this.recalculateDetails()
    }

    private recalculateDetails() {

        this.minutes = this._seconds / 60
        this.hours = this.minutes / 60

        this.hours = Math.floor(this.hours)
        this.minutes = this.minutes - 60 * this.hours

    }

    recalculate(status: string, duration: number){

        if (status == "normal") {
            this._seconds += duration
        } else {
            this._seconds -= duration
        }

        this.recalculateDetails()

        console.log(this.hours, this.minutes);


    }

}
