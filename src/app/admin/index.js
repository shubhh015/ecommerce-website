import { Delete, Edit } from "@mui/icons-material";
import {
    Autocomplete,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
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
import { toast } from "react-toastify";
import {
    addProduct,
    deleteProduct,
    fetchProducts,
    updateProduct,
} from "../../redux/productSlice";

const initialForm = {
    name: "",
    description: "",
    price: "",
    category: [],
    inventory: "",
    image: null,
    quantitySold: 0,
};
const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { products, categories, loading, error } = useSelector(
        (state) => state.products
    );

    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        const fetchData = async () => {
            const resultAction = await dispatch(fetchProducts({}));
            if (fetchProducts.rejected.match(resultAction)) {
                toast.error("Failed to load products");
            } else {
                toast.success("Products loaded successfully");
            }
        };
        fetchData();
    }, [dispatch]);

    const handleOpen = (product = null) => {
        setEditId(product?._id || null);
        setForm(
            product
                ? {
                      name: product.name,
                      description: product.description,
                      price: product.price,
                      category: Array.isArray(product.category)
                          ? product.category
                          : [product.category],
                      image: product.image ? product.image.url : null,
                      isActive: product?.isActive,
                      inventory: product.inventory,
                      quantitySold: product.quantitySold,
                  }
                : initialForm
        );
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setForm(initialForm);
        setEditId(null);
        dispatch(fetchProducts({}));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        let payload;
        if (form.image) {
            const imageFile = {
                url: form.image,
                alt: form.name,
            };
            payload = new FormData();
            payload.append("image", form.imageFile);
            payload.append("name", form.name);
            payload.append("description", form.description);
            payload.append("price", form.price);
            payload.append("category", form.category);
            payload.append("isActive", form.inventory > 0 ? true : false);
            payload.append("inventory", form.inventory);
            payload.append("quantitySold", form.quantitySold);
        } else {
            payload = {
                name: form.name,
                description: form.description,
                price: form.price,
                category: form.category,
                isActive: form.inventory > 0 ? true : false,
                inventory: form.inventory,
                quantitySold: form.quantitySold || 0,
            };
        }

        if (editId) {
            dispatch(updateProduct({ id: editId, updates: payload }));
        } else {
            dispatch(addProduct(payload));
        }
        handleClose();
    };
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const handleDelete = (id) => {
        if (window.confirm("Delete this product?")) {
            dispatch(deleteProduct(id));
        }
    };
    useEffect(() => {
        const wordCount = search.trim().split(/\s+/).filter(Boolean).length;
        if (wordCount > 3 || selectedCategory.length > 0) {
            handleFilter();
        }
    }, [search, selectedCategory]);

    const handleFilter = () => {
        dispatch(
            fetchProducts({ keyword: search, category: selectedCategory })
        );
    };
    return (
        <Box p={4}>
            <Typography variant="h4" mb={2}>
                Admin Dashboard
            </Typography>
            <Box display="flex" gap={2} mb={2}>
                <TextField
                    label="Search Products"
                    variant="outlined"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") handleFilter();
                    }}
                />
                <Autocomplete
                    multiple
                    options={categories}
                    getOptionLabel={(option) => option}
                    value={selectedCategory}
                    onChange={(e, newValue) => setSelectedCategory(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Categories"
                            size="small"
                        />
                    )}
                    sx={{ minWidth: 200 }}
                />
                <Button variant="contained" onClick={handleFilter}>
                    Filter
                </Button>
            </Box>

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
                        <TableCell> Product Details</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Stock</TableCell>
                        <TableCell>Sold</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product._id}>
                            <TableCell>
                                <Box display="flex" alignItems="center" gap={2}>
                                    {product?.image?.url && (
                                        <img
                                            src={product.image.url}
                                            alt={
                                                product.image.alt ||
                                                product.name
                                            }
                                            style={{
                                                width: 60,
                                                height: 60,
                                                objectFit: "cover",
                                                borderRadius: 4,
                                            }}
                                        />
                                    )}
                                    <Box>
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight="bold"
                                        >
                                            {product.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                        >
                                            {product.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>

                            <TableCell>{product.price}</TableCell>
                            <TableCell>
                                {Array.isArray(product.category)
                                    ? product.category.join(", ")
                                    : product.category}
                            </TableCell>
                            <TableCell>{product.inventory}</TableCell>
                            <TableCell>{product?.quantitySold || 0}</TableCell>
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
                    {form.image && (
                        <Box mt={2}>
                            <img
                                src={form.image}
                                alt="Preview"
                                style={{
                                    width: "100%",
                                    maxHeight: 200,
                                    objectFit: "contain",
                                }}
                            />
                        </Box>
                    )}
                    <Box mt={2}>
                        <input
                            accept="image/*"
                            id="upload-image"
                            type="file"
                            style={{ display: "none" }}
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    const file = e.target.files[0];
                                    setForm((prev) => ({
                                        ...prev,
                                        image: URL.createObjectURL(file),
                                        imageFile: file,
                                    }));
                                }
                            }}
                        />
                        <label htmlFor="upload-image">
                            <Button variant="outlined" component="span">
                                Upload Image
                            </Button>
                        </label>
                    </Box>
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
                    <TextField
                        margin="dense"
                        label="Stock"
                        name="inventory"
                        type="number"
                        value={form.inventory}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Autocomplete
                        multiple
                        id="categories-multiple"
                        options={categories}
                        getOptionLabel={(option) => option}
                        value={form.category || []}
                        onChange={(event, newValue) => {
                            setForm((prev) => ({
                                ...prev,
                                category: newValue,
                            }));
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Categories"
                                placeholder="Select Categories"
                                margin="dense"
                                fullWidth
                            />
                        )}
                    />
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
