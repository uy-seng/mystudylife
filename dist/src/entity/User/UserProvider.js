var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "..";
let UserProvider = class UserProvider {
};
__decorate([
    PrimaryColumn("uuid"),
    Field(() => String),
    __metadata("design:type", String)
], UserProvider.prototype, "id", void 0);
__decorate([
    Column(),
    Field(() => String),
    __metadata("design:type", String)
], UserProvider.prototype, "name", void 0);
__decorate([
    OneToOne(() => User),
    __metadata("design:type", User)
], UserProvider.prototype, "user", void 0);
UserProvider = __decorate([
    Entity("user_provider"),
    ObjectType()
], UserProvider);
export { UserProvider };
//# sourceMappingURL=UserProvider.js.map