import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import axios from "axios";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Modal({ setOpenModal, id, setNames, names, no }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const deleteName = () => {
    if (no == 1) {
      axios
        .delete(`https://asset-3xk6.onrender.com/employee/${id}`)
        .then((response) => {
          const filteredNames = names.filter((name) => name._id !== id);
          setNames(filteredNames);
          setOpenModal(false);
          if (response.status === 201) {
            toast.success("Category is deleted successfully", {
              position: "top-center",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (no == 2) {
      axios
        .delete(`https://asset-3xk6.onrender.com/category/${id}`)
        .then((response) => {
          const filteredNames = names.filter((name) => name._id !== id);
          setNames(filteredNames);
          setOpenModal(false);
          if (response.status === 201) {
            toast.success("Category is deleted successfully", {
              position: "top-center",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (no == 3) {
      axios
        .delete(`https://asset-3xk6.onrender.com/department/${id}`)
        .then((response) => {
          const filteredNames = names.filter((name) => name._id !== id);
          setNames(filteredNames);
          setOpenModal(false);
          if (response.status === 201) {
            toast.success("Category is deleted successfully", {
              position: "top-center",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setOpenModal(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure want to delete this data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Disagree
          </Button>
          <Button onClick={deleteName}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Modal;
