import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription!: Subscription;

  constructor() {
  }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // })
    const customIntervalObservable: Observable<number> = new Observable((observer) => {
      let count = 0
      setInterval(() => {
        observer.next(count);

        if (count === 2) {
          observer.complete();
        }

        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    customIntervalObservable.pipe(map((data: number) => {
      return 'Round: ' + (data + 1);
    }));


    // Old method of doing this - this is now deprecated
    // this.firstObsSubscription = customIntervalObservable.subscribe(data => {
    //   console.log(data);
    // }, error => {
    //   console.log(error);
    //   alert(error.message);
    // });

    // New method of handling the observable cases
    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
      return data > 0;
    }) ,map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.log(error);
        alert(error.message);
      },
      complete: () => {
        console.log('Completed!');
      }
    });
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
