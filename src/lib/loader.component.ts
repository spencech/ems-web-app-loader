import { Component, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges, HostBinding } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LoaderService } from "./loader.service";
import { LoaderType } from "./loader.classes";

@Component({
  selector: 'loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.less']
})
export class LoaderComponent implements OnInit, AfterViewInit, OnChanges  {

  @HostBinding('class.showLoader') showLoader: boolean = false;
  @HostBinding('class.transparent') transparent: boolean = true;
  @HostBinding('class.spinner') spinner: boolean = true;
  @HostBinding('class.ellipsis') ellipsis: boolean = false;
  @Input("transition-speed") speed: number = 1000;
  @Input("animation-duration") animation: number = 1000;
  @Input("size") size: number = 200;
  @Input("color") color: string = "#001F39";
  @Input("background") background: string = "rgba(255,255,255,0.25)";
  @Input("z-index") zIndex: number = 10000;

  public type: LoaderType = LoaderType.Spinner;
  public LoaderType = LoaderType;
  public styles!: SafeHtml;

  private timeout: number = 0;

  constructor(private service: LoaderService, private sanitizer: DomSanitizer) {};

  ngOnInit() {
    this.buildStyles();
  }

  ngAfterViewInit(): void {
    window.setTimeout(this.initialize);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.buildStyles();
  }

  private buildStyles() {
    const eclipseSize = this.size * 0.8;
    const transformSize = (eclipseSize / 2) + 2;
    const position = (this.size - eclipseSize) / 2;
    const translate1 = -0.5 * this.size;
    const translate2 = 0.5 * this.size;

    const dotSize = this.size;
    const dotBoxSize = dotSize * 6;
    const dotTop = (dotBoxSize - dotSize) / 2;
    const dotGap = (dotBoxSize - (3 * dotSize)) / 4;
    const dotEdge2 = (2 * dotGap) + dotSize;
    const dotEdge3 = (3 * dotGap) + (2 * dotSize);
    const transform = dotGap + dotSize;

    const styles = `<style>
      @keyframes lds-ellipsis2 {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(${transform}px, 0);
        }
      }

      loader.spinner,
      loader.spinner.showLoader,
      loader.spinner.hideLoader,
      loader.ellipsis,
      loader.ellipsis.showLoader,
      loader.ellipsis.hideLoader {
        transition: opacity ${this.speed / 1000}s;
      }

      loader.spinner.showLoader,
      loader.ellipsis.showLoader {
        background: ${this.background};
        z-index: ${this.zIndex};
      }

      loader.spinner .lds-eclipse div:not(.percentage) {
        box-shadow: 0 4px 0 0 ${this.color};
        width: ${eclipseSize}px;
        height: ${eclipseSize}px;
        top: ${position}px;
        left: ${position}px;
        -webkit-transform-origin: ${eclipseSize/2}px ${transformSize}px;
        transform-origin: ${eclipseSize/2}px ${transformSize}px;
        -webkit-animation: lds-eclipse ${this.animation/1000}s linear infinite;
        animation: lds-eclipse ${this.animation/1000}s linear infinite;
      }

      loader.spinner .lds-eclipse {
        width: ${this.size}px;
        height: ${this.size}px;
        -webkit-transform: translate(${translate1}px, ${translate1}px) scale(1) translate(${translate2}px, ${translate2}px);
        transform: translate(${translate1}px, ${translate1}px) scale(1) translate(${translate2}px, ${translate2}px);
      }

      loader.ellipsis .lds-ellipsis {
        width: ${dotBoxSize}px;
        height: ${dotBoxSize}px;
      }

      loader.ellipsis .lds-ellipsis div {
        top: ${dotTop}px;
        width: ${dotSize}px;
        height: ${dotSize}px;
        background: ${this.color};
      }

      loader.ellipsis .lds-ellipsis div:nth-child(1) {
        left: ${dotGap}px;
        animation-duration: ${this.animation/1000}s !important;
      }
      
      loader.ellipsis  .lds-ellipsis div:nth-child(2) {
        left: ${dotGap}px;
        animation: lds-ellipsis2 ${this.animation/1000}s infinite !important;
      }

      loader.ellipsis .lds-ellipsis div:nth-child(3) {
        left: ${dotEdge2}px;
        animation: lds-ellipsis2 ${this.animation/1000}s infinite !important;
      }

      loader.ellipsis .lds-ellipsis div:nth-child(4) {
        left: ${dotEdge3}px;
        animation-duration: ${this.animation/1000}s !important;
      }

      
    </style>`;

    this.styles = this.sanitizer.bypassSecurityTrustHtml(styles);
  }

  private initialize = () => {
    this.service.loader$.subscribe(request => {
      this.type = request.type ?? LoaderType.Spinner;
      this.ellipsis = this.type === LoaderType.Ellipsis;
      this.spinner = this.type === LoaderType.Spinner;
      this.render(request.render);
    });
  }

  private render(show: boolean) {
    clearTimeout(this.timeout);
    if(show) this.show();
    else this.hide();
  }

  private show() {
    this.showLoader = true;
    this.timeout = window.setTimeout(() => this.transparent = false);
  }

  private hide() {
    this.transparent = true;
    this.timeout = window.setTimeout(() => this.showLoader = false, this.speed);
  }
}

