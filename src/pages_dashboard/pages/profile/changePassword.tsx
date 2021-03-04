import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useStyles } from "./style";

export const ChangePassword = () => {
  const classes = useStyles();
  const [, setOpenDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Password must be 8-16 characters and include both numbers and letters.
        </DialogContentText>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              label="Current Password"
              required
              fullWidth
              name="password"
              type="password"
              placeholder="Current Password"
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              label="New Password"
              required
              fullWidth
              name="password"
              type="password"
              placeholder="New Password"
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="off"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              label="Confirm Password"
              required
              fullWidth
              name="password"
              type="password"
              placeholder="Confirm Password"
              InputLabelProps={{
                shrink: true,
              }}
              autoComplete="off"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className="mb-30">
        <Button
          onClick={handleCloseDialog}
          color="primary"
          className={classes.backBtn}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCloseDialog}
          color="primary"
          className={classes.submit}
        >
          Submit
        </Button>
      </DialogActions>
    </>
  );
};
