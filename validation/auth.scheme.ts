export {};
const yup = require('yup');

const authSchema = yup.object().shape({ 
  firstName:  yup.string().required(),
  lastName:  yup.string().required(), 
  email: yup.string().email().required(),
  password: yup.string().required()    
});

module.exports = authSchema;