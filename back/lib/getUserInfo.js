function getUserInfo(user) {
  return {
    contact: user.contact,
    name: user.name,
    id: user.id || user._id,
  };
}

module.exports = getUserInfo;
