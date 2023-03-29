const { Op } = require('sequelize');
const { User } = require('../../db');

const isUserDuplicated = async (username, id = 0) => {
    const options = {};
    const userNameCondition = { [Op.iLike]: `${username}` };
    const idCondition = { [Op.ne]: id }
    options.where = { [Op.and]: [{ id: idCondition }, { username: userNameCondition }] };

    let users = await User.findAndCountAll(options);

    return (users.count > 0);
}

module.exports = { isUserDuplicated };
