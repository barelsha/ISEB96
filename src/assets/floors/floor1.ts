import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export let floor1 =  {
    parts: Observable.of([
            { RoomNumber: 123, Cols: 2, Rows: 2, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/123'},
            { RoomNumber: 122, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/122'},
            { RoomNumber: 121, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/121'},
            { RoomNumber: 119, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/119'},
            { RoomNumber: 118, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/118'},
            { RoomNumber: 117, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/117'},
            { RoomNumber: 116, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/116'},
            { RoomNumber: 115, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/115'},
            { RoomNumber: 114, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/114'},
            { RoomNumber: 113, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/113'},
            { RoomNumber: 112, Cols: 2, Rows: 2, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/112'},
            { RoomNumber: null, Cols: 9, Rows: 1 },
            { RoomNumber: 109, Cols: 2, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/109'},
            { RoomNumber: null, Cols: 9, Rows: 1 },
            { RoomNumber: 111, Cols: 2, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/111'},
            { RoomNumber: 108, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/108'},
            { RoomNumber: null, Cols: 11, Rows: 1 },
            { RoomNumber: 101, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/101'},
            { RoomNumber: 107, Cols: 2, Rows: 2, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/107'},
            { RoomNumber: null, Cols: 9, Rows: 1 },
            { RoomNumber: 102, Cols: 2, Rows: 2, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/102'},
            { RoomNumber: 106, Cols: 3, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/106'},
            { RoomNumber: 105, Cols: 2, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/105'},
            { RoomNumber: 104, Cols: 2, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/104'},
            { RoomNumber: null, Cols: 1, Rows: 1 },
            { RoomNumber: 103, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/103'}
            

    ]),
    columns: 13
}