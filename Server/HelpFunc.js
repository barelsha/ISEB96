

//remove first char
function removeFirst(str){
    let newStr = str;
    if (str.charAt(0) == '$') {
        newStr = str.substr(1);
    }
    return newStr;
}

//return the json field in hebrew from DB without '$'
// exports.changeJSON=function (resParam) {
//     let newResParam = resParam;
//     let lengthRes = newResParam.length;
//     for (i = 0; i < lengthRes; i++) {
//         for (key in resParam2[i]) {
//             if (key === "FirstName") {
//                 newResParam[i][key] = removeFirst(newResParam[i][key]);
//             }
//             if (key === "LastName") {
//                 newResParam[i][key] = removeFirst(newResParam[i][key]);
//             }
//             if (key === "EquipName") {
//                 newResParam[i][key] = removeFirst(newResParam[i][key]);
//             }
//             if (key === "RoomName") {
//                 newResParam[i][key] = removeFirst(newResParam[i][key]);
//             }
//             if (key === "Description") {
//                 newResParam[i][key] = removeFirst(newResParam[i][key]);
//             }
//         }
//     }
//     return newResParam;
// }

exports.changeJSON=function (resParam) {
    let newResParam = resParam;
    newResParam.forEach(element => {
        element.FirstName = (element.FirstName === null || element.FirstName === undefined) ? null : removeFirst(element.FirstName);
        element.LastName = (element.LastName === null || element.LastName === undefined) ? null : removeFirst(element.LastName);
        element.EquipName = (element.EquipName === null || element.EquipName === undefined) ? null : removeFirst(element.EquipName);
        element.Description = (element.Description === null || element.Description === undefined) ? null : removeFirst(element.Description);
        element.RoomName = (element.RoomName === null || element.RoomName === undefined) ? null : removeFirst(element.RoomName);
        element.Title = (element.Title === null || element.Title === undefined) ? null : removeFirst(element.Title);
    });
    return newResParam;
}

