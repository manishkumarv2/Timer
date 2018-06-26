import { Observable } from 'data/observable';
const ObservableArray = require("data/observable-array").ObservableArray;

export class HelloWorldModel extends Observable {

    private _isStarted: Boolean = false;
    private _counter: number;
    private _message: string;
    private timer;

    public hours = "0";
    public minutes = "0";
    public seconds = "0";

    public data = new ObservableArray([
        { count: "3250", date: "25/06/2018" },
    ]);


    constructor() {
        super();
        this.initialize();

    }

    initialize() {
        // Initialize default values.
        this._counter = 0; // 82790;
        this.hours = "0";
        this.minutes = "0";
        this.seconds = "0";
        this.updateMessage();
        this._isStarted = false;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        if (this._message !== value) {
            this._message = value;
            this.notifyPropertyChange('message', value)
        }
    }

    // Public Methods
    public onStart() {
        this._isStarted = true;
        this.updateMessage();
        this.startTimer();
    }

    public onStop() {
        this._isStarted = false;
        clearTimeout(this.timer);
        this.updateMessage();
    }

    public onReset() {
        this.onStop();
        this.initialize();
    }

    // Private Methods

    private startTimer() {
        this.timer = setInterval(() => this.callback(), 1000);
    }

    private callback() {
        this.updateMessage();
        this._counter++;
    }

    private updateMessage() {

        this.hours = Math.floor(this._counter / 3600).toString();
        this.minutes = Math.floor((this._counter / 60) % 60).toString();
        this.seconds = Math.floor(this._counter % 60).toString();

        this.updateClockDisplay();

        this.message = `${this.hours}:${this.minutes}:${this.seconds}`;
    }
    public convertValueToTime(value: number): string {
        var hour = Math.floor(value / 3600).toString();
        var minute = Math.floor((value / 60) % 60).toString();
        var second = Math.floor(value % 60).toString();

        return hour + ":" + minute + ":" + second;

    }
    private updateClockDisplay() {
        if (this.hours.length < 2) {
            this.set("myH1Src", "~/images/" + this.hours + ".png");
            this.hours = '0' + this.hours;
            this.set("myH0Src", "~/images/0.png");
        } else {
            let h0 = this.hours.substr(0, 1);
            let h1 = this.hours.substr(1, 1);

            this.set("myH1Src", "~/images/" + h1 + ".png");
            this.set("myH0Src", "~/images/" + h0 + ".png");
        }

        if (this.minutes.length < 2) {
            this.set("myM1Src", "~/images/" + this.minutes + ".png");
            this.minutes = '0' + this.minutes;
            this.set("myM0Src", "~/images/0.png");
        } else {
            let m0 = this.minutes.substr(0, 1);
            let m1 = this.minutes.substr(1, 1);

            this.set("myM1Src", "~/images/" + m1 + ".png");
            this.set("myM0Src", "~/images/" + m0 + ".png");
        }


        if (this.seconds.length < 2) {
            this.set("myS1Src", "~/images/" + this.seconds + ".png");
            this.seconds = '0' + this.seconds;
            this.set("myS0Src", "~/images/0.png");
        } else {
            let s0 = this.seconds.substr(0, 1);
            let s1 = this.seconds.substr(1, 1);

            this.set("myS1Src", "~/images/" + s1 + ".png");
            this.set("myS0Src", "~/images/" + s0 + ".png");
        }
    }
}
