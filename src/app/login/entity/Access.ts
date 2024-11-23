import User from "./User";

class Access{
    public userCode: User;
    public accessEmail: string;
    public accessPassword: string;
    public accessUUID: string;

    constructor(userCode: User, accessEmail: string, accessPassword: string, accessUUID: string){
        this.userCode = userCode;
        this.accessEmail = accessEmail;
        this.accessPassword = accessPassword;
        this.accessUUID = accessUUID;
    };
};

export default Access;
