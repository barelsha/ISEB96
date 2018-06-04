import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export let floor0 =  {
    parts: Observable.of([
            { RoomNumber: 18, Cols: 2, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 17, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 16, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 14, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 13, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 12, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 11, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 10, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 9, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 8, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 7, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 6, Cols: 1, Rows: 2, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 3, Cols: 2, Rows: 4, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: null, Cols: 10, Rows: 1 },
            { RoomNumber: null, Cols: 9, Rows: 1 },
            { RoomNumber: 5, Cols: 2, Rows: 2 , color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: null, Cols: 9, Rows: 1 },
            { RoomNumber: null, Cols: 8, Rows: 1 },
            { RoomNumber: 1, Cols: 3, Rows: 3 , color: (new Observable((obs) => { obs.next('#69F0AE') }))}
    ]),
    columns: 13
}