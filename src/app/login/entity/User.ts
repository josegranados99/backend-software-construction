class User {
  public userCode: number;
  public userName: string;
  public userLastname: string;

  constructor(userCode: number, userName: string, userLastname: string) {
    this.userCode = userCode;
    this.userName = userName;
    this.userLastname = userLastname;
  }
}

export default User;
