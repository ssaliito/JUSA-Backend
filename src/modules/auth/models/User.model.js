const getConnection = require('../../../interface/DBconn.js');

// User model
class User {
  constructor(name, userName, keyword, rol, email, state, phoneNumber) {
    this.name = name;
    this.userName = userName;
    this.keyword = keyword;
    this.rol = rol;
    this.email = email;
    this.state = state;
    this.phoneNumber = phoneNumber;
  }

  async createUser() {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de inserción

      // id	name	user_name	keyword	rol	email	state	phone_number
      const [result] = await connection.query(`
        INSERT INTO users (name,	user_name,	keyword,	rol,	email,	state,	phone_number)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [this.name, this.userName, this.keyword, this.rol, this.email, this.state, this.phoneNumber]);
      // Obtén el ID del último registro insertado
      const userId = result.insertId;

      return { id: userId }; // Devuelve el ID del nuevo usuario
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al insertar el usuario'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }

  async viewUsers() {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de selección
      const [result] = await connection.query(`
        SELECT *
        FROM users
      `);
      return result; // Devuelve el resultado de la consulta
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al obtener los usuarios'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }

  async updateUser(userId) {
    const connection = await getConnection();

    try {
      // Ejecuta la consulta de actualización
      await connection.query(`
        UPDATE users
        SET name = ?,
        user_name = ?,
        keyword	 = ?,
        rol = ?,
        email = ?,
        state = ?,
        phone_number = ?
        WHERE id = ?
      `, [this.name, this.userName, this.keyword, this.rol, this.email, this.state, this.phoneNumber, userId]);

      return { id: userId }; // Devuelve el ID del usuario actualizado
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al actualizar el usuario'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }

  async findUser() {

    const connection = await getConnection();

    try {
      // Ejecuta la consulta de selección
      const [result] = await connection.query(`
          SELECT 
          id, 
          name as name, 
          user_name as userName, 
          rol as rol, email as email, 
          state as status, 
          phone_number as phoneNumber 
          FROM users 
          WHERE user_name = ? 
          AND keyword = ?
          AND email = ?;`
        , [this.userName, this.keyword, this.email]);

      return result; // Devuelve el resultado de la consulta
    }
    catch (error) {
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al obtener el usuario'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }

  }

  async deleteUser(userId) {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de eliminación
      await connection.query(`
        DELETE FROM users
        WHERE id = ?
      `, [userId]);
      return { id: userId }; // Devuelve el ID del usuario eliminado
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al eliminar el usuario'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }
}
module.exports = User;