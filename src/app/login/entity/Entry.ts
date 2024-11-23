class Entry{
    public entryCode: number;
    public userCode: string;
    public entryDate: string;
    public entryHour: string;

    constructor(entryCode: number, userCode: string, entryDate: string, entryHour: string){
        this.entryCode = entryCode;
        this.userCode = userCode;
        this.entryDate = entryDate;
        this.entryHour = entryHour;
    };
};

export default Entry;

