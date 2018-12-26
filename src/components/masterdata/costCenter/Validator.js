import FormValidator from '../../../helper/FormValidator';

const validator = new FormValidator([
    { 
      field: 'costCenterCode', 
      method: 'isEmpty',
      validWhen: false, 
      message: 'Required.'
    },
    { 
      field: 'baCode', 
      method: 'isEmpty',
      validWhen: false, 
      message: 'Required..' 
    },
    { 
        field: 'costCenterDesc', 
        method: 'isLength',
        args:[{max:100 }],
        validWhen: true, 
        message: 'Max 100 Character.' 
      }
    ]);

export default validator; 