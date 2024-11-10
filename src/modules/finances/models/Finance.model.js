const getConnection = require('../../../interface/DBconn.js');

// Finance model
class Finance {
    constructor(income, fixedExpenses, variableExpenses, savingsPlan) {
        this.income = income;
        this.fixedExpenses = fixedExpenses;
        this.variableExpenses = variableExpenses;
        this.savingsPlan = savingsPlan;
  }

  async createFinance() {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de inserción

      // id income, fixed_expenses, variable_expenses, savings_plan
      const [result] = await connection.query(`
        INSERT INTO finances (income, fixed_expenses, variable_expenses, savings_plan)
        VALUES (?, ?, ?, ?)
      `, [this.income, this.fixedExpenses, this.variableExpenses, this.savingsPlan]);
      // Obtén el ID del último registro insertado
      const financeId = result.insertId;

      return { id: financeId }; // Devuelve el ID de la nueva finanza
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al insertar las finanzas'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }

  async viewFinance() {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de selección
      const [result] = await connection.query(`
        SELECT *
        FROM finances
      `);
      return result; // Devuelve el resultado de la consulta
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al obtener las finanzas'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }

  async updateFinance(financeId) {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de actualización
      await connection.query(`
        UPDATE finances
        SET income = ?,
        fixed_expenses = ?,
        variable_expenses = ?,
        savings_plan = ?
        WHERE id = ?
      `, [this.income, this.fixedExpenses, this.variableExpenses, this.savingsPlan, financeId]);
      return { id: financeId }; // Devuelve el ID del usuario actualizado
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al actualizar las finanzas'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }

  async deleteFinance(financeId) {
    const connection = await getConnection();
    try {
      // Ejecuta la consulta de eliminación
      await connection.query(`
        DELETE FROM finances
        WHERE id = ?
      `, [financeId]);
      return { id: financeId }; // Devuelve el ID de la financia eliminada
    } catch (error) {
      console.log(error);
      throw {
        ok: false,
        statusCode: 500,
        data: 'Ocurrió un error al eliminar la finanza'
      };
    } finally {
      connection.release(); // Libera la conexión de vuelta al pool
    }
  }
}
module.exports = Finance;