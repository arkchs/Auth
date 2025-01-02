export class AuthService{
    static sessionStorage = new Map();
    constructor(){
    }
    setUser(username, sessionid){
        AuthService.sessionStorage.set(sessionid,username);
    }

    getUser(sessionid){
        return AuthService.sessionStorage.get(sessionid);
    }
}