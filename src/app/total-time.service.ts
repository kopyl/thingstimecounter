import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TotalTimeService {

    _seconds: number = 0
    hours: number = 0
    minutes: number = 0

    timeTillHistory: Array<string> = [""]  // initial value to compare similarity

    timeTill: string = new Date( Date.now() ).toLocaleTimeString('en-GB')

    isChanged: boolean = false
    isTimeTillChanged = false

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

    dateNowStr() {
        let date: Date | string = new Date(Date.now() + this.seconds * 1000)
        date = date.toLocaleTimeString('en-GB')
        return date
    }

    CheckIfNewItemInHistory() {
        this.isTimeTillChanged = true
        // this.timeTillHistory[0] !=
        // this.timeTillHistory[1]
    }

    // set newHistoryTillItem(date: string) {
    //     this.timeTillHistory.push(date)

    //     this.timeTillHistory =
    //     this.timeTillHistory.slice(
    //         this.timeTillHistory.length-2,
    //         this.timeTillHistory.length
    //     )

    //     this.CheckIfNewItemInHistory()
    // }

    getTimeTill() {
        console.log("getting time till");

        let date: Date | string = new Date(Date.now() + this.seconds * 1000)
        date = date.toLocaleTimeString('en-GB')
        // this.newHistoryTillItem = date

        // console.log(this.timeTillHistory)
        // console.log(this.isTimeTillChanged)

        return date
    }

    public recalculateDetails() {

        this.isChanged = false

        const beforeTimeTill = this.timeTill

        const beforeChangeData = JSON.stringify(this)

        this.minutes = this._seconds / 60
        this.hours = this.minutes / 60

        this.hours = Math.floor(this.hours)
        this.minutes = this.minutes - 60 * this.hours

        const afterChangeData = JSON.stringify(this)

        this.timeTill = this.getTimeTill()

        console.log(beforeTimeTill, this.timeTill)


        if (beforeChangeData != afterChangeData) {
            this.isChanged = true
        }

        this.isTimeTillChanged = beforeTimeTill != this.timeTill

        console.log(this.isTimeTillChanged)


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
