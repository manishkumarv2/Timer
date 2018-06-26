import { Observable } from 'data/observable';
const ObservableArray = require("data/observable-array").ObservableArray;
// var couchbaseModule = require("nativescript-couchbase");
import { Couchbase } from 'nativescript-couchbase';

export class HelloWorldModel extends Observable {

    private _isStarted: Boolean = false;
    private _counter: number;
    private _message: string;
    private timer;

    public hours = "0";
    public minutes = "0";
    public seconds = "0";

    public dataArray = [];

    private database: any;

    public data = new ObservableArray([
        // { first: "3250", last: "25/06/2018" },
        // { first: "3251", last: "25/06/2018" },
        // { first: "3252", last: "25/06/2018" },
        // { first: "3253", last: "25/06/2018" },
        // { first: "3254", last: "25/06/2018" },
    ]);


    constructor() {
        super();
        this.initialize();

        this.database = new Couchbase("test-database");

        this.createData();
    }

    createData() {
        // create a document
        var di = this.database.createDocument({
            "first": "Rob",
            "last": "Lauer",
            "company": "Progress"
        });
        this.dataArray.push(di);

        this.dataArray.push(this.database.createDocument({
            "first": "mob",
            "last": "Laueasr",
            "company": "Proasasgress"
        }));

        this.dataArray.push(this.database.createDocument({
            "first": "Rob1",
            "last": "Lauer1",
            "company": "Progress"
        }));

        this.dataArray.push(this.database.createDocument({
            "first": "mob1",
            "last": "Laueasr1",
            "company": "Proasasgress"
        }));

        this.dataArray.push(this.database.createDocument({
            "first": "Rob2",
            "last": "Lauer2",
            "company": "Progress"
        }));

        this.dataArray.push(this.database.createDocument({
            "first": "mob2",
            "last": "Laueasr",
            "company": "Proasasgress"
        }));

        this.dataArray.push(this.database.createDocument({
            "first": "manish",
            "last": "kumar",
            "company": "v2Solutions"
        }));
        this.dataArray.push(this.database.createDocument({
            "first": "felix",
            "last": "idf",
            "company": "github"
        }));

        this.dataArray.forEach(element => {
            this.data.push(this.database.getDocument(element));
        });
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
