import EditIcon from "@mui/icons-material/Edit";
import {
    Avatar,
    Box,
    Button,
    CircularProgress,
    IconButton,
    Modal,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/profileSlice";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 380,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const EditProfileModal = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.profile?.user);
    const { loading } = useSelector((state) => state.profile || {});
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        avatar: "",
    });
    const [avatarPreview, setAvatarPreview] = useState("");
    const fileInputRef = useRef();

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                avatar: user.avatar || "",
            });
            setAvatarPreview(user.avatar || "");
        }
    }, [user, open]);

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleAvatarClick = () => fileInputRef.current.click();
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatarPreview(reader.result);
            reader.readAsDataURL(file);

            setForm((prev) => ({
                ...prev,
                avatar: file,
            }));
        }
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Prepare data for API
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        if (form.avatar instanceof File) {
            formData.append("avatar", form.avatar);
        }
        // Dispatch updateProfile thunk (should handle FormData in API)
        await dispatch(updateProfile(formData));
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="edit-profile-modal"
        >
            <Box sx={style} component="form" onSubmit={handleSubmit}>
                <Typography variant="h6" mb={2}>
                    Edit Profile
                </Typography>
                <Stack direction="column" alignItems="center" mb={2}>
                    <Avatar
                        src={avatarPreview}
                        alt={form.name}
                        sx={{ width: 80, height: 80, mb: 1 }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleAvatarChange}
                    />
                    <IconButton
                        onClick={handleAvatarClick}
                        color="primary"
                        size="small"
                    >
                        <EditIcon />
                    </IconButton>
                </Stack>
                <TextField
                    label="Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Phone Number"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Stack
                    direction="row"
                    spacing={2}
                    mt={3}
                    justifyContent="flex-end"
                >
                    <Button onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={
                            loading ? <CircularProgress size={18} /> : null
                        }
                    >
                        Save
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};

export default EditProfileModal;
