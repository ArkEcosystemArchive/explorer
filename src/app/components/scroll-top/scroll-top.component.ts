import { Component, OnInit, ElementRef, HostListener, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'ark-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.less']
})
export class ScrollTopComponent implements OnInit {
  public showButton: boolean = false;

  constructor( @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if(window.pageYOffset >= window.innerHeight / 2) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }

  public scrollTop() {
    // TODO: fix smooth scroll
    window.scrollTo(0, 0);
  }

}
