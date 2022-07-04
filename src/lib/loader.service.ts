import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, throwError, of } from 'rxjs';
import { LoaderType, ILoaderRequest } from "./loader.classes";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private type: LoaderType = LoaderType.Spinner;
  private loader:BehaviorSubject<ILoaderRequest> = new BehaviorSubject<ILoaderRequest>({ type: LoaderType.Spinner, render: false });
  public loader$ = this.loader.asObservable();

  public load(render: boolean, type: LoaderType = LoaderType.Spinner) {
    this.type = type;
    this.loader.next({ render, type});
  }

  public show() {
    this.load(true, this.type);
  } 

  public hide() {
    this.load(false, this.type);
  }
}
