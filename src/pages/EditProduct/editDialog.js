import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Edit } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { TextField } from '@mui/material';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const labelAdds = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};
function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labelAdds[value]}`;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function EditDialog({ Product, index, setProducts, products, updateProducts }) {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = useState({
    brand: Product.brand,
    category: Product.category,
    description: Product.description,
    discountPercentage: Product.discountPercentage,
    id: Product.id,
    images: [Product.images[0], Product.images[1]],
    price: Product.price,
    rating: Product.rating,
    stock: Product.stock,
    thumbnail: Product.thumbnail,
    title: Product.title,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };
  const [errorMessages, setErrorMessages] = useState({
    brand: '',
    category: '',
    description: '',
    discountPercentage: '',
    price: '',
    rating: '',
    stock: '',
    thumbnail: '',
    title: '',
    images: ''
  });


  const updateProduct = () => {
    if (validateForm()) {
      fetch(`https://dummyjson.com/products/${product.id}`, {
        method: 'PUT', // or PATCH
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: product.title,
          brand: product.brand,
          description: product.description,
          price: product.price,
          category: product.category,
          discountPercentage: product.discountPercentage,
          thumbnail: product.thumbnail,
          rating: product.rating,
          images: product.images
        })
      })
        .then(res => res.json())
        .then(updatedProduct => {
          const updatedProducts = [...products];
         
          updatedProducts[index] = updatedProduct;
          setProducts(updatedProducts);
          setOpenSnackbar(true);

          updateProducts(updatedProducts);

          console.log('Product updated:', updatedProduct);
          setProduct(updatedProduct);

         
          handleClose();

        })
        .catch(error => {
          console.error('Error updating product:', error);

        });
    }
  };


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name && name.startsWith('images')) {

      const index = parseInt(name.match(/\d+/)[0], 10);
      const updatedImages = [...product.images];
      updatedImages[index] = value;

      setProduct({
        ...product,
        images: updatedImages,
      });
    } else {

      setProduct({
        ...product,
        [name]: value,
      });
    
    }

    setErrorMessages({
      ...errorMessages,
      [name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrorMessages = {};

    // Rating validation
    const rating1 = parseFloat(product.rating);
    if (isNaN(rating1) || rating1 < 0 || rating1 > 5) {
      newErrorMessages.rating = 'Rating must be a float between 0 and 5';
      isValid = false;
    }

    // Discount validation
    const discount = parseFloat(product.discountPercentage);
    if (isNaN(discount) || discount < 0 || discount > 100) {
      newErrorMessages.discountPercentage = 'Discount must be a float between 0 and 100';
      isValid = false;
    }

    // Stock validation
    const stock1 = parseInt(product.stock, 10);
    if (isNaN(stock1) || stock1 <= 0) {
      newErrorMessages.stock = 'Stock must be a positive integer';
      isValid = false;
    }

    // Empty fields validation
    const requiredFields = ['thumbnail', 'title', 'price', 'category', 'description', 'brand'];

    requiredFields.forEach(field => {
      if (!product[field]) {
        newErrorMessages[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} cannot be empty`;
        isValid = false;
      }
    });

    setErrorMessages(newErrorMessages);
    return isValid;
  };


  return (
    <React.Fragment>
      <Button variant="outlined" startIcon={<Edit />} size='small' sx={{ p: 0 }} onClick={(handleClickOpen)}>
        Edit
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className='editdialog'
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            width: '80%',
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#4D44B5', color: "white" }} id="customized-dialog-title">
          Edit Product
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>

        </DialogContent>

        <div className="editform">
          <form className='edit'>

            <Grid container spacing={6}>
              <Grid item xs={4}>
                <p className='labelAdd'>Title *</p>
                <TextField className='edit' id="Title" name="title" placeholder="Title" type='text'
                  value={product.title} onChange={handleChange} error={Boolean(errorMessages.title)} helperText={errorMessages.title}
                />
              </Grid>
              <Grid item xs={4}>
                <p className='labelAdd'>Price *</p>
                <TextField type='number' className='edit' id="Price" name="price" placeholder="Price" value={product.price} onChange={handleChange} error={Boolean(errorMessages.price)} helperText={errorMessages.price} />
              </Grid>
              <Grid item xs={4}>
                <p className='labelAdd'>Brand *</p>
                <TextField className='edit' id="Brand" name="brand" placeholder="Brand" value={product.brand} onChange={handleChange} error={Boolean(errorMessages.brand)} helperText={errorMessages.brand} />
              </Grid>
              <Grid item xs={4}>
                <p className='labelAdd'>Discount % *</p>
                <TextField className='edit' id="Discount_Percentage" name="discountPercentage" placeholder="Discount Percentage" value={product.discountPercentage} onChange={handleChange} error={Boolean(errorMessages.discountPercentage)} helperText={errorMessages.discountPercentage} />
              </Grid>
              <Grid item xs={4}>
                <p className='labelAdd'>Stock *</p>
                <TextField className='edit' id="Stock" name="stock" placeholder="stock" value={product.stock} onChange={handleChange} error={Boolean(errorMessages.stock)} helperText={errorMessages.stock} />
              </Grid>
              <Grid item xs={4}>
                <p className='labelAdd'>Category *</p>
                <TextField className='edit' id="Category" name="category" placeholder="Category" value={product.category} onChange={handleChange} error={Boolean(errorMessages.category)} helperText={errorMessages.category} />
              </Grid>
              <Grid item xs={6}>
                <p className='labelAdd'>Description *</p>
                <TextField className='edit' id="Description" name="description" placeholder="Description" value={product.description} multiline
                  rows={4} onChange={handleChange} error={Boolean(errorMessages.description)} helperText={errorMessages.description} />
              </Grid>
              <Grid item xs={6}>
                <p className='labelAdd'>Rating *</p>
                <TextField className='edit' id="Rating" name="rating" placeholder="Rating" value={product.rating} onChange={handleChange} error={Boolean(errorMessages.rating)} helperText={errorMessages.rating} />
                <Rating
                  name="rating"
                  value={product.rating}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                    handleChange(event);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                    handleChange(event);
                  }}
                  emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                />
                {value !== null && (
                  <Box sx={{ ml: 2 }}>{labelAdds[hover !== -1 ? hover : product]}</Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <p className='labelAdd'>Thumbnail Link *</p>
                <TextField className='links' id="Thumbnail" name="thumbnail" placeholder="Thumbnail" value={product.thumbnail} onChange={handleChange} error={Boolean(errorMessages.thumbnail)} helperText={errorMessages.thumbnail} />
              </Grid>
              <Grid item xs={12} >
                <p className='labelAdd'>Image Links *</p>
                <TextField className='links' id="Image" name="images[0]" placeholder="Images (Optional)" value={product.images[0]} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} style={{ marginBottom: '20px' }}>
                <TextField className='links' id="Image" name="images[1]" placeholder="Images (Optional)" value={product.images[1]}
                  onChange={handleChange} />
              </Grid>

            </Grid>
          </form>
        </div>
        <DialogActions className='submit'>

          <Button type="submit" onClick={updateProduct} sx={{ backgroundColor: "#4D44B5", padding: '5px 40px' }} size='small' variant='contained' >Update</Button>
        </DialogActions>
      </BootstrapDialog>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Product is updated successfully
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
