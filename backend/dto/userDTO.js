class UserDTO {
    constructor( username, email, password) {
      if ( !username || !email || !password) {
        throw new Error("All fields are required");
      }
  
      if (!this.isValidEmail(email)) {
        throw new Error("Invalid Email format");
      }
     
      this.username = username;
      this.email = email;
      this.password = password;
    }
  
    isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }
  }
  
  module.exports = UserDTO;