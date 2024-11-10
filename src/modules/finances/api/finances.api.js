const ResponseBody = require('../../../shared/model/ResponseBody.model');
const { createFinance, viewFinance, updateFinance, deleteFinance } = require('../controller/finances.controller');

const createFinanceAPI = async (req, res) => {
  let { income, fixedExpenses, variableExpenses, savingsPlan } = req.body;
  let message;

  try {
    let response = await createFinance({ income, fixedExpenses, variableExpenses, savingsPlan });
    message = new ResponseBody(true, 200, response);
  } catch (error) {
    if (error.statusCode) {
      message = new ResponseBody(error.ok, error.statusCode, error.data);
    } else {
      console.log(error);
      message = new ResponseBody(false, 500, 'Ocurrió un error al procesar la solicitud.');
    }
  }

  return res.json(message);
  
}

const viewFinanceAPI = async (req, res) => {
  let message;

  try {
    let response = await viewFinance();
    message = new ResponseBody(true, 200, response);
  } catch (error) {
    if (error.statusCode) {
      message = new ResponseBody(error.ok, error.statusCode, error.data);
    } else {
      console.log(error);
      message = new ResponseBody(false, 500, 'Ocurrió un error al procesar la solicitud.');
    }
  }

  return res.json(message);
}

const updateFinanceAPI = async (req, res) => {
  let {income, fixedExpenses, variableExpenses, savingsPlan, id} = req.body;
  let message;

  if (!id) {
    return res.json(new ResponseBody(false, 400, 'El ID de la finanza es requerido.'));
  }

  try {
    let response = await updateFinance({ income, fixedExpenses, variableExpenses, savingsPlan, id });
    message = new ResponseBody(true, 200, response);
  } catch (error) {
    if (error.statusCode) {
      message = new ResponseBody(error.ok, error.statusCode, error.data);
    } else {
      console.log(error);
      message = new ResponseBody(false, 500, 'Ocurrió un error al procesar la solicitud.');
    }
  }

  return res.json(message);
}

const deleteFinanceAPI = async (req, res) => {
  let { id } = req.body;
  let message;

  if (!id) {
    return res.json(new ResponseBody(false, 400, 'El ID de la finanza es requerido.'));
  }

  try {
    let response = await deleteFinance({ id });
    message = new ResponseBody(true, 200, response);
  } catch (error) {
    if (error.statusCode) {
      message = new ResponseBody(error.ok, error.statusCode, error.data);
    } else {
      console.log(error);
      message = new ResponseBody(false, 500, 'Ocurrió un error al procesar la solicitud.');
    }
  }

  return res.json(message);
}


module.exports = {
  createFinanceAPI,
  viewFinanceAPI,
  updateFinanceAPI,
  deleteFinanceAPI,
};