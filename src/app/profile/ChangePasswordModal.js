import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { clearProfileSuccess, updatePassword } from "../../redux/profileSlice";

const ChangePasswordModal = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.profile);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        dispatch(updatePassword(data)).then((action) => {
            if (updatePassword.fulfilled.match(action)) {
                reset();
                dispatch(clearProfileSuccess());
                onClose();
            }
        });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Change Password</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error">{error}</Alert>}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        margin="dense"
                        label="Current Password"
                        type="password"
                        fullWidth
                        {...register("oldPassword", {
                            required: "Current password is required",
                        })}
                        error={!!errors.oldPassword}
                        helperText={errors.oldPassword?.message}
                    />
                    <TextField
                        margin="dense"
                        label="New Password"
                        type="password"
                        fullWidth
                        {...register("newPassword", {
                            required: "New password is required",
                            minLength: {
                                value: 6,
                                message: "At least 6 characters",
                            },
                        })}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword?.message}
                    />
                    <TextField
                        margin="dense"
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        {...register("confirmPassword", {
                            required: "Please confirm your new password",
                            validate: (value) =>
                                value === watch("newPassword") ||
                                "Passwords do not match",
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                    <DialogActions>
                        <Button onClick={onClose} disabled={loading}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                        >
                            Update
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ChangePasswordModal;
