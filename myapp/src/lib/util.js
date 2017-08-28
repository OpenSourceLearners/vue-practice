function dateFormat(format, date){
    date = date || new Date();
    var o = {
        'y+': date.getFullYear(),
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    };
    for(var i in o){
        format = format.replace(new RegExp(i), o[i] < 10 ? '0' + o[i] : o[i]);
    }
    return format;
}
export {
    dateFormat
};