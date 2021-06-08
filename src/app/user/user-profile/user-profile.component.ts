import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';

import { Subject, combineLatest, Observable, of, forkJoin, concat} from "rxjs";
import { mapTo, startWith, scan, tap, map, mergeMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  //балуюсь с rxjs 

  public obj1$ = new Subject<Number>();
  public obj2$ = new Subject<Number>();

  constructor() { }

  ngOnInit(): void {
    this.obj1$.subscribe(sub => console.log(sub))
    this.obj2$.subscribe(sub => console.log(sub))

    this.combinate()
  }

  randomSubj() {
    this.obj1$.next(Math.random());
    this.obj2$.next(Math.random());
    console.log("щёлк")
  }

  private combinate() {
    combineLatest([this.obj1$, this.obj2$]).pipe(
      filter((data1, data2) => Boolean(data1) && Boolean(data2)),
      map(data1 => data1 + 'gag'),
      tap(data => console.log(data + "data"))
    )
      .subscribe(data => console.log("[" + data + "]"));
  }

  ngOnDestrou(): void {
    this.obj1$.unsubscribe();
    this.obj2$.unsubscribe();
  }
}
