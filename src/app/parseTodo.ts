
interface timeUnit {
    hours: boolean,
    minutes: boolean
}

const isLetter = (letter: string) => (
    letter.toLowerCase() != letter.toUpperCase()
)

const isNumber = (character: string) => (
    !isNaN( parseInt(character) )
)

class Time {

    isValid: boolean = false
    rawTimeWithQuotes: string
    rawTime: string
    contentBeforeTime: string
    timeUnits: timeUnit = { hours: false, minutes: false }
    indexOfQuotes: number

    minutes: number = 0
    hours: number = 0
    seconds: number = 0

    constructor(private todo: string) {
        this.getRawTimeWithQuotes()
        this.getRawTime()
        this.getIndexOfQuotes()
        this.verify()
        this.getTime()
    }

    getRawTimeWithQuotes() {

        const rawTimeWithQuotes = this.todo.substring(
            this.todo.indexOf("("),
            this.todo.indexOf(")") + 1
        )
        this.rawTimeWithQuotes = rawTimeWithQuotes

    }

    getRawTime() {

        const rawTime = this.todo.substring(
            this.todo.indexOf("(") + 1,
            this.todo.indexOf(")")
        )
        this.rawTime = rawTime

    }

    getIndexOfQuotes() {
        this.indexOfQuotes = this.todo
        .indexOf(this.rawTimeWithQuotes)
    }

    verify() {

        type ArrayOrStr = string | Array<string>

        const onlyNumbersInTime = () => {

            let timeWithoutColumn: ArrayOrStr = (
                this.rawTime.replace(":", "")
            )
            timeWithoutColumn = Array.from(
                timeWithoutColumn
            )

            return timeWithoutColumn.every(
                (character: string) =>
                isNumber(character)
            )

        }

        const contentBeforeTimeHasNoLetters = () => {

            const contentBeforeTime = this.todo
            .substring( 0, this.indexOfQuotes )

            return !contentBeforeTime.split("")
            .some(e => isLetter(e))

        }

        if (
            this.rawTime &&
            contentBeforeTimeHasNoLetters() &&
            onlyNumbersInTime()
        ) {
            this.isValid = true
        }

    }

    getSeconds() {
        this.seconds += this.minutes * 60
        this.seconds += this.hours * 3600
    }

    getTime() {

        if (!this.isValid) return

        const arrayRawTime = this.rawTime.split(":")

        if (arrayRawTime.length == 2 && arrayRawTime[1]) {
            this.timeUnits.minutes = true
            this.minutes = parseInt(arrayRawTime[1])
        }

        if (arrayRawTime[0]) {
            this.timeUnits.hours = true
            this.hours = parseInt(arrayRawTime[0])
        }

        this.getSeconds()

    }

}

export class ParseTodo {

    constructor(private todoRaw: string) {}

    todo: any = this.todoObject()

    todoObject() {

        const todo = {
            time: this.time,
            text: this.text
        }

        return todo

    }

    get time() {
        return new Time(this.todoRaw)
    }

    get date() {
        let date = ""
        const words = this.todoRaw.split(" ")

        for (const word of words.slice(1, 4)) {
            if (word.split(".").length - 1 == 2) {
                date = word
                break
            }
        }
        return date
    }

    get text() {
        const time = this.time

        let text = ""
        if (time.isValid) {
            text = this.todoRaw.substring(
                time.indexOfQuotes +
                time.rawTimeWithQuotes.length
            )
            .trim()
        } else {
            text = this.todoRaw.substring(
                this.todoRaw.indexOf(this.date) +
                this.date.length
            )
            .trim()
        }
        return text

    }

}
