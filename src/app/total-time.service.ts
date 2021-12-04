import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TotalTimeService {

    _seconds: number = 0
    hours: number = 0
    minutes: number = 0

    timeTill: string = new Date( Date.now() ).toLocaleTimeString('en-GB')

    isChanged: boolean = false

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

    getTimeTill() {
        console.log("getting time till");

        const date = new Date(Date.now() + this.seconds * 1000)
        return date.toLocaleTimeString('en-GB')
    }

    public recalculateDetails() {

        this.isChanged = false

        const beforeChangeData = JSON.stringify(this)

        this.minutes = this._seconds / 60
        this.hours = this.minutes / 60

        this.hours = Math.floor(this.hours)
        this.minutes = this.minutes - 60 * this.hours

        const afterChangeData = JSON.stringify(this)

        this.timeTill = this.getTimeTill()

        if (beforeChangeData != afterChangeData) {
            this.isChanged = true
        }


    }

    recalculate(status: string, duration: number){



        if (status == "normal") {
            this._seconds += duration
        } else {
            this._seconds -= duration
        }

        this.recalculateDetails()



    }

}
