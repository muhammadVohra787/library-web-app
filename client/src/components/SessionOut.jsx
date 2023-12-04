import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";

const SessionTimeoutWarningModal = ({
    open,
    onClose,
    onImHereClick,
    onCancelClick,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Session Timeout Warning</DialogTitle>
            <DialogContent>
                <p>
                    Your session is about to expire. Click "I'm Here" to stay
                    logged in.
                </p>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onImHereClick}
                    variant="contained"
                    color="primary"
                >
                    I'm Here
                </Button>
                <Button
                    onClick={onCancelClick}
                    variant="contained"
                    color="secondary"
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SessionTimeoutWarningModal;
