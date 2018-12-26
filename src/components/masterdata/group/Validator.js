import FormValidator from '../../../helper/FormValidator';

const validator = new FormValidator([
    { 
      field: 'groupName', 
      method: 'isEmpty',
      validWhen: false, 
        message: 'Required.'
    },{ 
      field: 'groupName', 
      method: 'isAlphanumeric',
      args:['en-IN'],
      validWhen: true, 
      message: 'Alphanumeric only..'
    },{ 
      field: 'groupName', 
      method: 'isLength',
      args:[{max:20 }],
      validWhen: true, 
      message: 'Max 20 Character.' 
    },{ 
      field: 'clientCode', 
      method: 'isEmpty',
      validWhen: false, 
        message: 'Required.'
    },{ 
      field: 'prefixCode', 
      method: 'isEmpty',
      validWhen: false, 
        message: 'Required.'
    },{ 
      field: 'portGsmCode', 
      method: 'isEmpty',
      validWhen: false, 
        message: 'Required.'
    },{ 
      field: 'privileges', 
      method: 'isEmpty',
      validWhen: false, 
        message: 'Required.'
    },{ 
      field: 'groupDesc', 
      method: 'isLength',
      args:[{max:100 }],
      validWhen: true, 
      message: 'Max 100 Character.' 
     }//,{ 
  //     field: 'url', 
  //     method: 'isEmpty',
  //     validWhen: false, 
  //       message: 'Required.'
  //   },{ 
  //     field: 'userName', 
  //     method: 'isEmpty',
  //     validWhen: false, 
  //       message: 'Required.'
  //   },{ 
  //     field: 'password', 
  //     method: 'isEmpty',
  //     validWhen: false, 
  //       message: 'Required.'
    
  // }
    ]);

export default validator; 