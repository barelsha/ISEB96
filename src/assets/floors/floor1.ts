import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export let floor1 =  {
    parts: Observable.of([
            { RoomNumber: 123, Cols: 2, Rows: 2, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 122, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 121, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 119, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 118, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 117, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 116, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 115, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 114, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 113, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 112, Cols: 2, Rows: 2, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: null, Cols: 9, Rows: 1 },
            { RoomNumber: 109, Cols: 2, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: null, Cols: 9, Rows: 1 },
            { RoomNumber: 111, Cols: 2, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 108, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: null, Cols: 11, Rows: 1 },
            { RoomNumber: 101, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 107, Cols: 2, Rows: 2, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: null, Cols: 9, Rows: 1 },
            { RoomNumber: 102, Cols: 2, Rows: 2, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 106, Cols: 3, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 105, Cols: 2, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: 104, Cols: 2, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
            { RoomNumber: null, Cols: 1, Rows: 1 },
            { RoomNumber: 103, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))}
            

    ]),
    columns: 13
}