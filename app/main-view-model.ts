import { Observable } from 'data/observable';

export class HelloWorldModel extends Observable {

    private _isStarted: Boolean = false;
    private _counter: number;
    private _message: string;
    private timer;


    constructor() {
        super();
        this.initialize();
    }

    initialize() {
        // Initialize default values.
        this._counter = 0;

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

        var hours = Math.floor(this._counter / 3600).toString();
        var minutes = Math.floor((this._counter / 60) % 60).toString();
        var seconds = Math.floor(this._counter % 60).toString();

        if (hours.length < 2) {
            hours = '0' + hours;
        }

        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }

        if (seconds.length < 2) {
            seconds = '0' + seconds;
        }

        this.message = `${hours}:${minutes}:${seconds}`;
    }
}
