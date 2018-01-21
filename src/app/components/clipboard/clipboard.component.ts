import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ark-clipboard',
    templateUrl: './clipboard.component.html',
    styleUrls: ['./clipboard.component.less']
})
export class ClipboardComponent implements OnInit {
    @Input() stringToCopy: string;

    public copied = false;

    constructor() { }

    ngOnInit() { }

    showCheck () {
        this.copied = true;
        setTimeout(() => {
            this.copied = false;
        }, 1000);
    }

}
