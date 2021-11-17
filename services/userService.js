/* const pool = require('../libs/postgresPool'); */

const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
class UserService {
  constructor() {
    /* this.pool = pool;
    this.pool.on('error', (err) => console.log(err)); */
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  /* async find() {
    const query = 'SELECT * FROM tasks';
    const rta = await this.pool.query(query);
    return rta.rows;
  } */
  async find() {
    const rta = await models.User.findAll({
      include: ['costumer'],
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
