import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


export let floorMinus1 = {
parts: Observable.of([
    {RoomNumber: -111, Cols: 2, Rows: 2, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
    {RoomNumber: -110, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
    {RoomNumber: -109, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
    {RoomNumber: -108, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
    {RoomNumber: -107, Cols: 4, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
    {RoomNumber: -106, Cols: 2, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
    {RoomNumber: -105, Cols: 2, Rows: 3, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
    {RoomNumber: null, Cols: 9, Rows: 1},
    {RoomNumber: -103, Cols: 2, Rows: 3, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
    {RoomNumber: null, Cols: 9, Rows: 1},
    {RoomNumber: null, Cols: 9, Rows: 1},
    
    
    {RoomNumber: -101, Cols: 2, Rows: 3, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
    {RoomNumber: null, Cols: 9, Rows: 1},
    {RoomNumber: -1031, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
    {RoomNumber: -153, Cols: 2, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
    {RoomNumber: -152, Cols: 1, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
    {RoomNumber: -151, Cols: 3, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))},
    {RoomNumber: -102, Cols: 4, Rows: 1, color: (new Observable((obs) => { obs.next('#69F0AE') }))}
]),
columns: 13
}