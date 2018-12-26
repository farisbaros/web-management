import swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { array } from 'prop-types';

export function handleApiError(props, error, errorTitle, errorText) {
  let statusCode = '999'
  let listError = [];
  let errorContent = '';

  try {
    if (error.response) {
      if (error.response.status) {
        statusCode = error.response.status;
      }
    }

    if (error.response) {
      listError = error.response.data.listError;
    }

    if (statusCode === '999') {
      errorContent = error.message;
    }
    else if (statusCode === '401') {

    }
    else {
      errorContent += errorText + '<br>';

      if (listError) {
        listError.forEach(e => {
          errorContent += e + '<br>'
        });
      }
    }

  } catch (ex) {
    errorContent = ex;
  }

  swal({
    title: errorTitle,
    html: errorContent,
    type: 'error',
  })
}
