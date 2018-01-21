import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ark-clipboard',
    templateUrl: './clipboard.component.html',
    styleUrls: ['./clipboard.component.less']
})
export class ClipboardComponent implements OnInit {
    @Input() stringToCopy: string;
    public copied = false;
    private timeoutID = undefined;

    constructor() { }

    ngOnInit() { }

    showCheck () {
        this.copied = true;

        if (this.timeoutID !== undefined) {
            clearTimeout(this.timeoutID);
        }

        this.timeoutID = setTimeout(() => {
            this.copied = false;
            this.timeoutID = undefined;
        }, 1000);
    }

}
