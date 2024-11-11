export class AdminModel {
  private _adminName!: string;
  private _adminPassword!: string;

  // Getter and Setter for adminName
  get adminName(): string {
    return this._adminName;
  }

  set adminName(name: string) {
    this._adminName = name;
  }

  // Getter and Setter for adminPassword
  get adminPassword(): string {
    return this._adminPassword;
  }

  set adminPassword(password: string) {
    this._adminPassword = password;
  }

  // Convert the AdminModel instance to a plain object
  toJSON() {
    return {
      adminName: this._adminName,
      adminPassword: this._adminPassword,
    };
  }
}
