// sing up, login, logout, sign out

const signUp = async (req, res) => {
  res.send("signUp");
};

const signOut = async (req, res) => {
  res.send("signout");
};

const login = async (req, res) => {
  res.send("login");
};

const logout = async (req, res) => {
  res.send("logout");
};

module.exports = {
  signUp,
  login,
  signOut,
  logout,
};
