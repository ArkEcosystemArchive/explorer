import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ark-clipboard',
    templateUrl: './clipboard.component.html',
    styleUrls: ['./clipboard.component.less']
})
export class ClipboardComponent implements OnInit {
    @Input() stringToCopy: string;

    constructor() { }

    ngOnInit() {
    }

}
