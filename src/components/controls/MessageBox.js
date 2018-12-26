import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// type: warning, error, success, info, and question

export function success() {
  swal({
    title: "Horeee!",
    text: "transaction was succeed",
    type: "success"
  });
}

export function error() {
  swal({
    title: "Oops!",
    text: "There is something wrong, Please contact IT Care",
    type: "error"
  });
}

export function messages(
  title = null,
  text = null,
  type = null,
  refresh = null
) {
  swal({
    title: title,
    text: text,
    type: type
  }).then(function() {
    if (refresh) window.location.reload();
  });
}

export function deleteData(args, id, confirmDelete) {
  let result = false;
  swal({
    title: "Delete",
    text: "Are you sure you want to delete this data?",
    type: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No"
  }).then(function(confirm) {
    confirmDelete(args, id, confirm);
  });
}

export function activeStatusData(args, id, confirmHandler) {
  let result = false;
  swal({
    title: "Active Status",
    text: "Are you sure you want to change this Active Status data?",
    type: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No"
  }).then(function(confirm) {
    confirmHandler(args, id, confirm);
  });
}

export function confirmation(args, title, text, confirmAction, dismissAction) {
  let result = false;
  swal({
    title: title,
    text: text,
    type: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No"
  }).then(
    function(confirm) {
      confirmAction(args);
    },
    function(dismiss) {
      dismissAction();
    }
  );
}
