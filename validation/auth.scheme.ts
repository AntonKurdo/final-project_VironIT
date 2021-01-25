export {};
const yup = require('yup');

const authSchema = yup.object().shape({ 
  email: yup.string().email().required(),
  password: yup.string().required()    
});

module.exports = authSchema;