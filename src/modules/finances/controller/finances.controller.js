const Finance = require('../models/Finance.model.js');
async function createFinance(options) {
  const finance = new Finance(
    options.income,
    options.fixedExpenses,
    options.variableExpenses,
    options.savingsPlan,
  );

  let financeResult;
  
  try {
    financeResult = await finance.createFinance();
  } catch (error) {
    if (error.statusCode) throw error;
    console.log(error);
    throw {
      ok: false,
      statusCode: 500,
      data: 'Ocurrió un error al crear la finanza'
    };
  }

  return {
    message: 'Finanza creada exitosamente'
  };
}

async function viewFinance() {
  const finance = new Finance();
  let financeResult;

  try {
    financeResult = await finance.viewFinance();
  } catch (error) {
    if (error.statusCode) throw error;
    console.log(error);
    throw {
      ok: false,
      statusCode: 500,
      data: 'Ocurrió un error al obtener las finanzas'
    };
  }

  return financeResult;
}

async function updateFinance(options) {
  const finance = new Finance(
    options.income,
    options.fixedExpenses,
    options.variableExpenses,
    options.savingsPlan
  );

  try {
    financeResult = await finance.updateFinance(options.id);
  } catch (error) {
    if (error.statusCode) throw error;
    console.log(error);
    throw {
      ok: false,
      statusCode: 500,
      data: 'Ocurrió un error al actualizar la finanza',
    };
  }

  return {
    message: 'Finanza actualizada exitosamente',
  };
}

async function deleteFinance(options) {
  const finance = new Finance();

  try {
    financeResult = await finance.deleteFinance(options.id);
  } catch (error) {
    if (error.statusCode) throw error;
    console.log(error);
    throw {
      ok: false,
      statusCode: 500,
      data: 'Ocurrió un error al eliminar la financia'
    };
  }

  return {
    message: 'Finanza eliminada exitosamente',
  };
}

module.exports = {
  createFinance,
  viewFinance,
  updateFinance,
  deleteFinance
};