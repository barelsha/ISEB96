import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export let floor0 =  {
    parts: Observable.of([
            { RoomNumber: 18, Cols: 2, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/18'},
            { RoomNumber: 17, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/17'},
            { RoomNumber: 16, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/16'},
            { RoomNumber: 14, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/14'},
            { RoomNumber: 13, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/13'},
            { RoomNumber: 12, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/12'},
            { RoomNumber: 11, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/11'},
            { RoomNumber: 10, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/10'},
            { RoomNumber: 9, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/9'},
            { RoomNumber: 8, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/8'},
            { RoomNumber: 7, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/7'},
            { RoomNumber: 6, Cols: 1, Rows: 2, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/6'},
            { RoomNumber: 3, Cols: 2, Rows: 4, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/3'},
            { RoomNumber: null, Cols: 10, Rows: 1 },
            { RoomNumber: null, Cols: 9, Rows: 1 },
            { RoomNumber: 5, Cols: 2, Rows: 2 , color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/5'},
            { RoomNumber: null, Cols: 9, Rows: 1 },
            { RoomNumber: null, Cols: 8, Rows: 1 },
            { RoomNumber: 1, Cols: 3, Rows: 3 , color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/1'}
    ]),
    columns: 13
}