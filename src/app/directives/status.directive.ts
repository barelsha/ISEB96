import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
 
@Directive({
  selector: '[appStatus]'
})
export class StatusDirective implements OnInit {
  @Input() status: string;
  
  @Input('appStatus') highlightColor: string;
  
  constructor(private el: ElementRef) {  }

  ngOnInit(){
    let color = this.status === '1' ? "lightgreen" : "lightpink";
    this.highlight(color);
  }
 
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}