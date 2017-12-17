import { Component, OnInit, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'ark-tools-dropdown',
  templateUrl: './tools-dropdown.component.html'
})
export class ToolsDropdownComponent implements OnInit {
  public elementRef;

  @Output() openMobMenu: EventEmitter<boolean> = new EventEmitter();

  constructor(private myElement: ElementRef) {
    this.elementRef = myElement;
  }

  ngOnInit() {
  }

  showTools() {
    this.elementRef.nativeElement.children[0].classList.toggle('open');
  }

  @HostListener('document:click', ['$event'])
  handleClick(event) {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
     } while (clickedComponent);

    if (!inside) {
      this.elementRef.nativeElement.children[0].classList.remove('open');
    }
  }

  closeMobileMenu() {
    this.openMobMenu.emit(false);
  }

}
