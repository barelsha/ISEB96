import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export let floor3 =  {
    parts: Observable.of([
            {RoomNumber: 321, Cols: 3, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/321'},
            {RoomNumber: 320, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/320'},
            {RoomNumber: 3181, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/3181'},
            {RoomNumber: 318, Cols: 2, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/318'},
            {RoomNumber: 317, Cols: 3, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/317'},
            {RoomNumber: 316, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/316'},
            {RoomNumber: 315, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/315'},
            {RoomNumber: 314, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/314'},
            {RoomNumber: 322, Cols: 2, Rows: 2, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/322'},
            {RoomNumber: null, Cols: 10, Rows: 1},
            {RoomNumber: 353, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/353'},
            {RoomNumber: null, Cols: 9, Rows: 1},
            {RoomNumber: 313, Cols: 2, Rows: 2, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/313'},
            {RoomNumber: 311, Cols: 2, Rows: 3, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/311'},
            {RoomNumber: null, Cols: 11, Rows: 1},
            {RoomNumber: 310, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/310'},
            {RoomNumber: 309, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/309'},
            {RoomNumber: 308, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/308'},
            {RoomNumber: 307, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/307'},
            {RoomNumber: 306, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/306'},
            {RoomNumber: 305, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/305'},
            {RoomNumber: 304, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/304'},
            {RoomNumber: null, Cols: 1, Rows: 1},
            {RoomNumber: 303, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/303'},
            {RoomNumber: 302, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/302'},
            {RoomNumber: 301, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/301'}
            

    ]),
    columns: 13
}