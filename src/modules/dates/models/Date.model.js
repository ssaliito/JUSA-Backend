const getConnection = require('../../../interface/DBconn.js');

// Date model
class Date {
  constructor(paymentDay, fixedExpensesDay, variableExpensesDay, userId, financeId) {
    this.paymentDay = paymentDay;
    this.fixedExpensesDay = fixedExpensesDay;
    this.variableExpensesDay = variableExpensesDay;
    this.userId = userId;
    this.financeId = financeId;
  }

  async createDate() {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de inserción

      // id income, fixed_expenses, variable_expenses, savings_plan
      const [result] = await connection.query(`
        INSERT INTO dates (payment_day, fixed_expenses_day, variable_expenses_day, user_id, finance_id)
        VALUES (?, ?, ?, ?, ?);
      `, [this.paymentDay, this.fixedExpensesDay, this.variableExpensesDay, this.userId, this.financeId]);
      // Obtén el ID del último registro insertado
      const dateId = result.insertId;

      return { id: dateId }; // Devuelve el ID de la nueva fecha
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al insertar la fecha'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }

  async viewDates() {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de selección
      const [result] = await connection.query(`
        SELECT 
          d.payment_day AS paymentDay,
          d.fixed_expenses_day AS fixedExpensesDay,
          d.variable_expenses_day AS variableExpensesday,
          u.id AS userId,
          f.id AS financeId,
          d.id AS id
        FROM dates d
        JOIN users u ON d.user_id = u.id
        JOIN finances f ON d.finance_id = f.id;
      `);
      return result; // Devuelve el resultado de la consulta
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al obtener la fechas'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }

  async updateDate(dateId) {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de actualización
      await connection.query(`
        UPDATE dates
          SET payment_day = ?,
          fixed_expenses_day = ?,
          variable_expenses_day = ?,
          finance_id = ?
        WHERE id = ?
      `, [this.paymentDay, this.fixedExpensesDay, this.variableExpensesDay, this.financeId, dateId]);
      return { id: dateId }; // Devuelve el ID de la fecha actualizad
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al actualizar la fecha'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }

  async deleteDate(dateId) {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de eliminación
      await connection.query(`
        DELETE FROM dates
        WHERE id = ?
      `, [dateId]);
      return { id: dateId }; // Devuelve el ID de la financia eliminada
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al eliminar la fecha'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }
}
module.exports = Date;