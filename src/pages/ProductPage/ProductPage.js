import * as React from 'react';
import './productPage.css'
import { Layout } from '../../components/Layout/layout'
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Search } from '@mui/icons-material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#4D44B5',
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then((data) => {
          console.log(data)
          setProducts(data.products);
          setFilteredProducts(data.products);
        }).catch((e) => console.log(e));
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);

    if (!searchValue) {
      setFilteredProducts(products);
    } else {
      const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchValue)
      );
      setFilteredProducts(filteredProducts);
    }
  };


  return (
    <>
      <Layout currentpage='home' heading='Product List'/>
      <div className='productpage'>
        <div className='search-container'>
         

          <TextField
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={handleSearch}
            className="search"
            
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              style: {
                borderRadius: "40px",
                backgroundColor:"white",
                padding: "8px 10px", 
                height: "50px",
                border: "none",
              }
            }}
            sx={{ borderRadius: 50 }}
          />

        </div>
        <div className='tableContainer'>
          <h2 className='heading'>Product Table</h2>
          {products.length > 0 ? <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell className='tableHead'>Id</StyledTableCell>
                  <StyledTableCell align="left">Title</StyledTableCell>
                  <StyledTableCell align="left">Description</StyledTableCell>
                  <StyledTableCell align="left">Price</StyledTableCell>
                  <StyledTableCell align="left">Brand</StyledTableCell>
                  <StyledTableCell align="left">Discount%</StyledTableCell>
                  <StyledTableCell align="left">Category</StyledTableCell>
                  <StyledTableCell align="left">Stock</StyledTableCell>
                  <StyledTableCell align="left">Rating</StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts.map((product) => (
                  <StyledTableRow key={product.name}>
                    <StyledTableCell component="th" scope="row">
                      {product.id}
                    </StyledTableCell>
                    <StyledTableCell align="left">{product.title}</StyledTableCell>
                    <StyledTableCell align="left">{product.description}</StyledTableCell>
                    <StyledTableCell align="left">{product.price}</StyledTableCell>
                    <StyledTableCell align="left">{product.brand}</StyledTableCell>
                    <StyledTableCell align="left">{product.discountPercentage}</StyledTableCell>
                    <StyledTableCell align="left">{product.category}</StyledTableCell>
                    <StyledTableCell align="left">{product.stock}</StyledTableCell>
                    <StyledTableCell align="left">{product.rating}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> :
            <div className="progress">
              <CircularProgress />
            </div>
          }
        </div>
      </div>
    </>
  )
}
