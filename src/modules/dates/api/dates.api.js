const ResponseBody = require('../../../shared/model/ResponseBody.model');
const { createDate, viewDates, updateDate, deleteDate } = require('../controller/dates.controller');

const createDateAPI = async (req, res) => {
  let { paymentDay, fixedExpensesDay, variableExpensesDay, userId, financeId } = req.body;
  let message;

  try {
    let response = await createDate ({ paymentDay, fixedExpensesDay, variableExpensesDay, userId, financeId });
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

const viewDatesAPI = async (req, res) => {
  let message;

  try {
    let response = await viewDates();
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

const updateDateAPI = async (req, res) => {
  let { paymentDay, fixedExpensesDay, variableExpensesDay, userId, financeId, id } = req.body;
  let message;

  if (!id) {
    return res.json(new ResponseBody(false, 400, 'El ID de la fecha es requerido.'));
  }

  try {
    let response = await updateDate({ paymentDay, fixedExpensesDay, variableExpensesDay, userId, financeId, id });
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

const deleteDateAPI = async (req, res) => {
  let { id } = req.body;
  let message;

  if (!id) {
    return res.json(new ResponseBody(false, 400, 'El ID de la fecha es requerido.'));
  }

  try {
    let response = await deleteDate({ id });
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
  createDateAPI,
  viewDatesAPI,
  updateDateAPI,
  deleteDateAPI,
};