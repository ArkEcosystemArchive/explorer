import { Component, Input } from '@angular/core';

@Component({
  selector: 'ark-error-section',
  templateUrl: './error-section.component.html',
  styleUrls: ['./error-section.component.less']
})
export class ErrorSectionComponent {
  @Input()
  public titleKey: string;

  @Input()
  public messageKey: string;

  @Input()
  public messageParams: Object;

  @Input()
  public error: Error;

  public showErrorDetails: boolean;
}
