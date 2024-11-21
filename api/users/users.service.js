const User = require("./users.model");
const bcrypt = require("bcrypt");

class UserService {
  
  getAll() {
    const users = User.find();  
    return users;
  }

  get(id) {
    try {
      const userQuery = User.findById(id, "-password"); 
      return userQuery;
    } catch (err) {
      throw err;
    }
  }

  create(data) {

    const user = new User(data);
    return user.save();
  }
  update(id, data) {
    return User.findByIdAndUpdate(id, data, { new: true });
  }
  delete(id) {
    return User.deleteOne({ _id: id });
  }
  async checkPasswordUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      return false;
    }
    const bool = await bcrypt.compare(password, user.password);
    if (!bool) {
      return false;
    }
    return user._id;
  }
}

module.exports = new UserService();
