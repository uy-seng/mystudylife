var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ArgsType, Field } from "type-graphql";
var OneOffScheduleArgs = (function () {
    function OneOffScheduleArgs() {
    }
    __decorate([
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], OneOffScheduleArgs.prototype, "date", void 0);
    __decorate([
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], OneOffScheduleArgs.prototype, "startTime", void 0);
    __decorate([
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], OneOffScheduleArgs.prototype, "endTime", void 0);
    __decorate([
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], OneOffScheduleArgs.prototype, "scheduleId", void 0);
    OneOffScheduleArgs = __decorate([
        ArgsType()
    ], OneOffScheduleArgs);
    return OneOffScheduleArgs;
}());
export { OneOffScheduleArgs };
var UpdateOneOffScheduleArgs = (function (_super) {
    __extends(UpdateOneOffScheduleArgs, _super);
    function UpdateOneOffScheduleArgs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Field(function () { return String; }),
        __metadata("design:type", String)
    ], UpdateOneOffScheduleArgs.prototype, "id", void 0);
    UpdateOneOffScheduleArgs = __decorate([
        ArgsType()
    ], UpdateOneOffScheduleArgs);
    return UpdateOneOffScheduleArgs;
}(OneOffScheduleArgs));
export { UpdateOneOffScheduleArgs };
//# sourceMappingURL=oneOffSchedule.js.map