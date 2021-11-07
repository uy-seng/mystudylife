export var isValidDateFormat = function (date) {
    var exp = /^(?:January|February|March|April|May|June|July|August|September|October|November|December)[-\ ](([0]?[1-9])|([1-2][0-9])|(3[01]))[\ ]\b\d{4}$/gm;
    var regex = new RegExp(exp);
    return regex.test(date);
};
//# sourceMappingURL=validate.utils.js.map