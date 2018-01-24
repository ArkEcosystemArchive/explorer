import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ark-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.less']
})
export class ClipboardComponent {
  @Input() stringToCopy: string;

  public constructor(private toastr: ToastrService,
                     private translate: TranslateService) {
  }

  public onCopied(): void {
    this.translate.get('GENERAL.COPY_CLIPBOARD_SUCCESS').subscribe(t => this.toastr.success(t));
  }
}
