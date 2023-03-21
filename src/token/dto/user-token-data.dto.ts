import { User } from "../../users/users.model";

export class UserTokenDto{
    readonly name:string
    readonly email:string
    readonly id: string

    constructor(user:User){
        this.name=user.name
        this.email=user.email
        this.id=user.id
    }
}