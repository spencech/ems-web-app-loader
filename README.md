# EMS Web Application Components: Loader Animation (spinner or ellipsis)

The Loader Angular.io module is authored for use within [web applications](https://github.com/spencech/ems-web-app-template) developed by [Educational Media Solutions](https://educationalmediasolutions.com).

The embedded component and service expose an interface for rendering a modal overlay and loader animation during server transactions.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

## Usage

Module Import:

	import { NgModule } from '@angular/core';
	import { BrowserModule } from '@angular/platform-browser';
	import { CommonModule } from '@angular/common';  

	import { AppComponent } from './app.component';
	import { LoaderModule, LoaderService } from "ems-web-app-loader"

	@NgModule({
	  declarations: [
	    AppComponent
	  ],
	  imports: [
	    BrowserModule,
	    CommonModule,
	    LoaderModule
	  ],
	  providers: [ LoaderService ],
	  bootstrap: [ AppComponent ]
	})
	export class AppModule { }



Usage in component:
	
	import { Component } from '@angular/core';
	import { LoaderService, LoaderType } from "ems-web-app-loader";
	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.less']
	})
	export class AppComponent {
	  public loading: boolean = false;
	  constructor(private loader: LoaderService) {}
	  toggleLoader() {
	    this.loading = !this.loading;
	    this.loader.load(this.loading, LoaderType.Ellipsis);
	  }
	  showLoader() {
	  	this.loader.show();
	  }
	  hideLoader() {
	  	this.loader.hide();
	  }
	}

Note that the loader type defaults to Loader.Spinner. If you want to use the ellipsis loader, you must call the load method at least once (as pictured above.) Subsequent show/hide calls will preserve this configuration

Supported loader types:

	LoaderType.Spinner
	LoaderType.Ellipsis

Service interface:

	load: (show: boolean, type: LoaderType = LoaderType.Spinner) => void; (initializes loader)
	show: () => void; shows default or previously initialized loader
	hide: () => void; hides default or previously initialized loader

Template Usage (settings for spinner):

	<button click="showLoader()">Load</button>	
	<loader [transition-speed]="2000" [animation-duration]="1000" [z-index]="100" [size]="200" color="#0099ff" background="rgba(0,255,0,0.25)" ></loader>
	
Template Usage (settings for ellipsis):

	<loader [transition-speed]="2000" [animation-duration]="600" [z-index]="100" [size]="13" color="#0099ff" background="rgba(0,255,0,0.25)" ></loader>


Template attributes with defaults:

	"transition-speed": number = 1000; // speed of fade in / fade out
	"animation-duration": number = 1000; //larger numbers slow down animation
	"size": number = 200; //in px ; 200 is good for spinner, 14 good for ellipsis
	"color": string = "#001F39"; //loader color
	"background": string = "rgba(255,255,255,0.25)"; //modal background
	"z-index": number = 10000;


## Code scaffolding

Run `ng generate component component-name --project loader` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project loader`.
> Note: Don't forget to add `--project loader` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build loader` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build loader`, go to the dist folder `cd dist/loader` and run `npm publish`.

## Running unit tests

Run `ng test loader` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
