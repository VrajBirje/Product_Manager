import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Delete } from '@mui/icons-material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteDialog({ deleteId, index, setProducts, products, updateProducts }) {
    const id = deleteId;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [openSnackbar, setOpenSnackbar] = useState(false)
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };

    const handleDelete = () => {
        fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(response => {
                console.log('Product deleted successfully:', response);

                const updatedProducts = [...products];
                updatedProducts.splice(index, 1);
                setProducts(updatedProducts);
                setOpenSnackbar(true);

                updateProducts(updatedProducts);

                handleClose();
            })
            .catch(error => {
                console.error('Error deleting product:', error);

                handleClose();
            });
    };
    return (
        <React.Fragment>
            <Button variant="outlined" color='error' size='small' sx={{ paddingY: 0, paddingX: 1 }} startIcon={<Delete />} onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ color: "#4D44B5", fontWeight: "bold" }}>{"Delete Product"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" >
                        Do you want to delete product ?
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-slide-description">
                        It will delete the product temporarily and it will shown again by reloading site
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ backgroundColor: "#4D44B5" }} size='small' variant='contained'>No</Button>
                    <Button onClick={handleDelete} sx={{ backgroundColor: "#4D44B5" }} size='small' variant='contained'>Yes</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleSnackbarClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Product is deleted successfully
                </Alert>
            </Snackbar>

        </React.Fragment>

    );
}
