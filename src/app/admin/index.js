import { Delete, Edit } from "@mui/icons-material";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addProduct,
    deleteProduct,
    fetchProducts,
    updateProduct,
} from "../../redux/productSlice";

const initialForm = { name: "", description: "", price: "", category: "" };

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { products, categories, loading, error } = useSelector(
        (state) => state.products
    );

    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        dispatch(fetchProducts({}));
    }, [dispatch]);

    const handleOpen = (product = null) => {
        setEditId(product?._id || null);
        setForm(
            product
                ? {
                      name: product.name,
                      description: product.description,
                      price: product.price,
                      category: product.category,
                  }
                : initialForm
        );
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setForm(initialForm);
        setEditId(null);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        if (editId) {
            dispatch(updateProduct({ id: editId, updates: form }));
        } else {
            dispatch(addProduct(form));
        }
        handleClose();
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this product?")) {
            dispatch(deleteProduct(id));
        }
    };

    return (
        <Box p={4}>
            <Typography variant="h4" mb={2}>
                Admin Dashboard
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpen()}
            >
                Add Product
            </Button>
            {loading && <CircularProgress />}
            {error && <Typography color="error">{error}</Typography>}
            <Table sx={{ mt: 2 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product._id}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => handleOpen(product)}>
                                    <Edit />
                                </IconButton>
                                <IconButton
                                    color="error"
                                    onClick={() => handleDelete(product._id)}
                                >
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {editId ? "Edit Product" : "Add Product"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Select
                        margin="dense"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        fullWidth
                        displayEmpty
                    >
                        <MenuItem value="">
                            <em>Select Category</em>
                        </MenuItem>
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        {editId ? "Update" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminDashboard;
