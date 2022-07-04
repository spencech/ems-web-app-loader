# Loader

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.0.

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

## Usage

Example Spinner Configuration

	<loader [transition-speed]="2000" [animation-duration]="1000" [z-index]="100" [size]="200" color="#0099ff" background="rgba(0,255,0,0.25)" ></loader>
	
Example Ellipsis Configuration

	<loader [transition-speed]="2000" [animation-duration]="600" [z-index]="100" [size]="13" color="#0099ff" background="rgba(0,255,0,0.25)" ></loader>

Component Usage:
	
	import { Component, AfterViewInit } from '@angular/core';
	import { LoaderService, LoaderType } from "loader";
	@Component({
	  selector: 'app-root',
	  templateUrl: './app.component.html',
	  styleUrls: ['./app.component.less']
	})
	export class AppComponent implements AfterViewInit {
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