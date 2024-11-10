const Date = require('../models/Date.model.js');
async function createDate(options) {
  const date = new Date(
    options.paymentDay, 
    options.fixedExpensesDay, 
    options.variableExpensesDay, 
    options.userId, 
    options.financeId
  );
  
  try {
    dateResult = await date.createDate();
  } catch (error) {
    if (error.statusCode) throw error;
    console.log(error);
    throw {
      ok: false,
      statusCode: 500,
      data: 'Ocurrió un error al crear la Fecha'
    };
  }

  return {
    message: 'Fecha ingresada exitosamente'
  };
}

async function viewDates() {
  const date = new Date();
  let dateResult;

  try {
    dateResult = await date.viewDates();
  } catch (error) {
    if (error.statusCode) throw error;
    console.log(error);
    throw {
      ok: false,
      statusCode: 500,
      data: 'Ocurrió un error al obtener las fechas'
    };
  }

  return dateResult;
}

async function updateDate(options) {
  const date = new Date(
    options.paymentDay, 
    options.fixedExpensesDay, 
    options.variableExpensesDay, 
    options.userId, 
    options.financeId
  );

  try {
    dateResult = await date.updateDate(options.id);
  } catch (error) {
    if (error.statusCode) throw error;
    console.log(error);
    throw {
      ok: false,
      statusCode: 500,
      data: 'Ocurrió un error al actualizar la fecha',
    };
  }

  return {
    message: 'Fecha actualizada exitosamente',
  };
}

async function deleteDate(options) {
  const date = new Date();

  try {
    dateResult = await date.deleteDate(options.id);
  } catch (error) {
    if (error.statusCode) throw error;
    console.log(error);
    throw {
      ok: false,
      statusCode: 500,
      data: 'Ocurrió un error al eliminar la fecha'
    };
  }

  return {
    message: 'Fceha eliminada exitosamente',
  };
}

module.exports = {
  createDate,
  viewDates,
  updateDate,
  deleteDate
};