import React, { useState } from 'react'
import './addproduct.css'
import { Layout } from '../../components/Layout/layout'
import Grid from '@mui/material/Grid';
import { TextField, CircularProgress } from '@mui/material';
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

export const AddProduct = () => {
 
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [productData, setProductData] = useState({
    brand: '',
    category: '',
    description: '',
    discountPercentage: '',
    id: 1,
    images: [null,null],
    price: '',
    rating: '',
    stock: '',
    thumbnail: '',
    title: '',
  });

  const handleClose = (event, reason) => {
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
    images:[]
  });

  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    console.log(productData)
    if (validateForm()) {
      console.log(productData)
      try {
        setLoading(true);

      
        setTimeout(async () => {
          const response = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
          });

          if (response.ok) {
            console.log('Product added successfully:', productData);
          
            setProductData({
              brand: '',
              category: '',
              description: '',
              discountPercentage: '',
              id: 1,
              images: ['', ''],
              price: '',
              rating: '',
              stock: '',
              thumbnail: '',
              title: '',
            });
            setOpenSnackbar(true);

          } else {
            console.error('Failed to add product:', response.statusText);
          }

          setLoading(false);
        }, 2000); 
      } catch (error) {
        console.error('Error adding product:', error);
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    if (name &&  name.startsWith('images')) {
    
      const index = parseInt(name.match(/\d+/)[0], 10); 
      const updatedImages = [...productData.images];
      updatedImages[index] = value;

      setProductData({
        ...productData,
        images: updatedImages,
      });
    } else {
      
      setProductData({
        ...productData,
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
    const rating = parseFloat(productData.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) {
      newErrorMessages.rating = 'Rating must be a float between 0 and 5';
      isValid = false;
    }

    // Discount validation
    const discount = parseFloat(productData.discountPercentage);
    if (isNaN(discount) || discount < 0 || discount > 100) {
      newErrorMessages.discountPercentage = 'Discount must be a float between 0 and 100';
      isValid = false;
    }

    // Stock validation
    const stock = parseInt(productData.stock, 10);
    if (isNaN(stock) || stock <= 0) {
      newErrorMessages.stock = 'Stock must be a positive integer';
      isValid = false;
    }

    // Empty fields validation
    const requiredFields = ['thumbnail', 'title', 'price', 'category', 'description', 'brand'];

    requiredFields.forEach(field => {
      if (!productData[field]) {
        newErrorMessages[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} cannot be empty`;
        isValid = false;
      }
    });

    setErrorMessages(newErrorMessages);
    return isValid;
  };
  return (
    <>
      <Layout currentpage='addProduct' heading='Add Product'/>
      <div className='addproduct'>
        <p className='formHeading'>Product Details</p>
        <div className='addContainer'>

          <form>

            <Grid container spacing={6}>
              <Grid item xs={4}>
                <p className='labelAdd'>Title *</p>
                <TextField className='edit' id="Title" name="title" placeholder="Title" type='text'
                  value={productData.title} onChange={handleChange} error={Boolean(errorMessages.title)} helperText={errorMessages.title}
                />
              </Grid>
              <Grid item xs={4}>
                <p className='labelAdd'>Price *</p>
                <TextField type='number' className='edit' id="Price" name="price" placeholder="Price" value={productData.price} onChange={handleChange} error={Boolean(errorMessages.price)} helperText={errorMessages.price} />
              </Grid>
              <Grid item xs={4}>
                <p className='labelAdd'>Brand *</p>
                <TextField className='edit' id="Brand" name="brand" placeholder="Brand" value={productData.brand} onChange={handleChange} error={Boolean(errorMessages.brand)} helperText={errorMessages.brand} />
              </Grid>
              <Grid item xs={4}>
                <p className='labelAdd'>Discount % *</p>
                <TextField className='edit' id="Discount_Percentage" name="discountPercentage" placeholder="Discount Percentage" value={productData.discountPercentage} onChange={handleChange} error={Boolean(errorMessages.discountPercentage)} helperText={errorMessages.discountPercentage} />
              </Grid>
              <Grid item xs={4}>
                <p className='labelAdd'>Stock *</p>
                <TextField type='number' className='edit' id="Stock" name="stock" placeholder="stock" value={productData.stock} onChange={handleChange} error={Boolean(errorMessages.stock)} helperText={errorMessages.stock} />
              </Grid>
              <Grid item xs={4}>
                <p className='labelAdd'>Category *</p>
                <TextField className='edit' id="Category" name="category" placeholder="Category" value={productData.category} onChange={handleChange} error={Boolean(errorMessages.category)} helperText={errorMessages.category} />
              </Grid>
              <Grid item xs={6}>
                <p className='labelAdd'>Description *</p>
                <TextField className='edit' id="Description" name="description" placeholder="Description" value={productData.description} multiline
                  rows={4} onChange={handleChange} error={Boolean(errorMessages.description)} helperText={errorMessages.description} />
              </Grid>
              <Grid item xs={6}>
                <p className='labelAdd'>Rating *</p>
                <TextField className='edit' type='number' id="Rating" name="rating" placeholder="Rating" value={productData.rating} onChange={handleChange} 
                error={Boolean(errorMessages.rating)} 
                helperText={errorMessages.rating} 
                
                />
                <Rating
                  name="rating"
                  value={productData.rating}
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
                  <Box sx={{ ml: 2 }}>{labelAdds[hover !== -1 ? hover : value]}</Box>
                )}
              </Grid>


            </Grid>
          </form>

        </div>
      </div>
      <div className='addproduct'>
        <p className='formHeading'>Links</p>
        <div className='addContainer'>
          <Grid item xs={12} style={{ marginBottom: '50px' }}>
            <p className='labelAdd'>Thumbnail Link *</p>
            <TextField className='links' id="Thumbnail" name="thumbnail" placeholder="Thumbnail" value={productData.thumbnail} onChange={handleChange} error={Boolean(errorMessages.thumbnail)} helperText={errorMessages.thumbnail} />
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '20px' }}>
            <p className='labelAdd'>Image Links *</p>
            <TextField className='links' id="Image" name="images[0]" placeholder="Images (Optional)" value={productData.images[0]} onChange={handleChange} 
            required={true}/>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '20px' }}>
            <TextField className='links' id="Image" name="images[1]" placeholder="Images (Optional)" value={productData.images[1]}
             onChange={handleChange} 
            required={true}/>
          </Grid>

        </div>
      </div>
      <div className='submitbutton'>
        <button className='addSubmit' type="button" onClick={handleAddProduct}>
          {loading ? <CircularProgress size={20} color='inherit' /> : 'Add Product'}
        </button>
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Product is added successfully
        </Alert>
      </Snackbar>
    </>
  )
}

