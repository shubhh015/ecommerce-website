import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, fetchAddresses } from "../../redux/addressSlice";
import {
    addGuestAddress,
    getGuestAddresses,
} from "../../utils/guestAddressUtils";

const AddressSelector = ({ open, onClose, onSelect }) => {
    const dispatch = useDispatch();
    const addresses = useSelector((state) => state.address.addresses);
    const isAuthenticated = useSelector((state) => !!state.auth.token);

    const [selected, setSelected] = useState("");
    const [showAdd, setShowAdd] = useState(false);
    const [form, setForm] = useState({});
    const [guestAddresses, setGuestAddresses] = useState([]);

    // Fetch addresses on open
    useEffect(() => {
        if (open) {
            if (isAuthenticated) {
                dispatch(fetchAddresses());
            } else {
                setGuestAddresses(getGuestAddresses());
            }
        }
    }, [open, dispatch, isAuthenticated]);

    const handleAdd = () => {
        if (isAuthenticated) {
            dispatch(addAddress(form)).then((action) => {
                if (addAddress.fulfilled.match(action)) {
                    setShowAdd(false);
                    setForm({});
                    setSelected(action.payload[action.payload.length - 1]._id);
                }
            });
        } else {
            const updated = addGuestAddress(form);
            setGuestAddresses(updated);
            setShowAdd(false);
            setForm({});
            setSelected(updated[updated.length - 1]._id);
        }
    };

    const displayAddresses = isAuthenticated ? addresses : guestAddresses;

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Select Shipping Address</DialogTitle>
            <DialogContent>
                <RadioGroup
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                >
                    {displayAddresses.map((addr) => (
                        <FormControlLabel
                            key={addr._id}
                            value={addr._id}
                            control={<Radio />}
                            label={
                                <Box>
                                    <Typography fontWeight="bold">
                                        {addr.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {addr.address}, {addr.city},{" "}
                                        {addr.state}, {addr.country} -{" "}
                                        {addr.pincode}
                                    </Typography>
                                    <Typography variant="body2">
                                        Phone: {addr.phone}
                                    </Typography>
                                </Box>
                            }
                        />
                    ))}
                </RadioGroup>
                <Button onClick={() => setShowAdd(!showAdd)} sx={{ mt: 2 }}>
                    {showAdd ? "Cancel" : "Add New Address"}
                </Button>
                {showAdd && (
                    <Box sx={{ mt: 2 }}>
                        <TextField
                            label="Name"
                            fullWidth
                            sx={{ mb: 1 }}
                            value={form.name || ""}
                            onChange={(e) =>
                                setForm((f) => ({ ...f, name: e.target.value }))
                            }
                        />
                        <TextField
                            label="Address"
                            fullWidth
                            sx={{ mb: 1 }}
                            value={form.address || ""}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    address: e.target.value,
                                }))
                            }
                        />
                        <TextField
                            label="City"
                            fullWidth
                            sx={{ mb: 1 }}
                            value={form.city || ""}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    city: e.target.value,
                                }))
                            }
                        />
                        <TextField
                            label="State"
                            fullWidth
                            sx={{ mb: 1 }}
                            value={form.state || ""}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    state: e.target.value,
                                }))
                            }
                        />
                        <TextField
                            label="Country"
                            fullWidth
                            sx={{ mb: 1 }}
                            value={form.country || ""}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    country: e.target.value,
                                }))
                            }
                        />
                        <TextField
                            label="Pincode"
                            fullWidth
                            sx={{ mb: 1 }}
                            value={form.pincode || ""}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    pincode: e.target.value,
                                }))
                            }
                        />
                        <TextField
                            label="Phone"
                            fullWidth
                            sx={{ mb: 1 }}
                            value={form.phone || ""}
                            onChange={(e) =>
                                setForm((f) => ({
                                    ...f,
                                    phone: e.target.value,
                                }))
                            }
                        />
                        <Button variant="contained" onClick={handleAdd}>
                            Save Address
                        </Button>
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        if (selected) onSelect(selected);
                    }}
                    disabled={!selected}
                >
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddressSelector;
