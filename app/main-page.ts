import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model';

let page;
var hwm;

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function navigatingTo(args: EventData) {

    page = <Page>args.object;
    hwm = new HelloWorldModel();


    console.log("hwm.minutes " + hwm.minutes);

    hwm.set("myH0Src", "~/images/0.png");
    hwm.set("myH1Src", "~/images/0.png");

    hwm.set("myM0Src", "~/images/0.png");
    hwm.set("myM1Src", "~/images/0.png");

    hwm.set("myS0Src", "~/images/0.png");
    hwm.set("myS1Src", "~/images/0.png");

    page.bindingContext = hwm;
}
