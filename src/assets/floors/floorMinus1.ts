import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


export let floorMinus1 = {
parts: Observable.of([
    {RoomNumber: -111, Cols: 2, Rows: 2, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/-111'},
    {RoomNumber: -110, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/-110'},
    {RoomNumber: -109, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/-109'},
    {RoomNumber: -108, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/-108'},
    {RoomNumber: -107, Cols: 4, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/-107'},
    {RoomNumber: -106, Cols: 2, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/-106'},
    {RoomNumber: -105, Cols: 2, Rows: 3, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/-105'},
    {RoomNumber: null, Cols: 9, Rows: 1},
    {RoomNumber: -103, Cols: 2, Rows: 3, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/-103'},
    {RoomNumber: null, Cols: 9, Rows: 1},
    {RoomNumber: null, Cols: 9, Rows: 1},
    {RoomNumber: -101, Cols: 2, Rows: 3, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/-101'},
    {RoomNumber: null, Cols: 9, Rows: 1},
    {RoomNumber: -1031, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/-1031'},
    {RoomNumber: -153, Cols: 2, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/-153'},
    {RoomNumber: -152, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/-152'},
    {RoomNumber: -151, Cols: 3, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/-151'},
    {RoomNumber: -102, Cols: 4, Rows: 1, color: (new Observable((obs) => { obs.next('rgba(224, 229, 227)') })), route : 'rooms/-102'}
]),
columns: 13
}