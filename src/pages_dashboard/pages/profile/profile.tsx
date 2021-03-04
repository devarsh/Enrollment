import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import { ChangePassword } from "./changePassword";
import { TextField, InputAdornment } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Dialog from "@material-ui/core/Dialog";
import { useStyles } from "./style";

export const Profile = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2020-08-18T21:11:54")
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [OpenDialog, setOpenDialog] = React.useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const names = ["Core Products", "Cross Products", "RL", "SME", "CF"];
  const [productName, setproductName] = React.useState<string[]>([]);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setproductName(event.target.value as string[]);
  };

  const ITEM_HEIGHT = 32;
  const ITEM_PADDING_TOP = 2;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.paper}>
        <Typography component="h3" className={classes.pageTitle}>
          Profile
        </Typography>

        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="User Name"
                placeholder="User Name"
                fullWidth
                required
                name="firstName"
                value="uname"
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="First Name"
                placeholder="First Name"
                fullWidth
                required
                name="firstName"
                value="First Name"
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Middle Name"
                placeholder="Middle Name"
                fullWidth
                name="middleName"
                value="Middle Name"
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Last Name"
                placeholder="Last Name"
                fullWidth
                required
                name="lastName"
                value="Last Name"
                InputLabelProps={{
                  shrink: true,
                }}
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  id="dob"
                  label="Date of Birth"
                  format="MM/dd/yyyy"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Mobile Number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+91</InputAdornment>
                  ),
                }}
                inputProps={{
                  maxLength: 10,
                }}
                placeholder="Enter mobile number to get OTP"
                fullWidth
                className="mobileNumber"
                type="number"
                name="phoneNumber"
                value="9898989898"
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Email"
                placeholder="Email"
                fullWidth
                name="email"
                InputLabelProps={{
                  shrink: true,
                }}
                value="abc@abc.com"
                autoComplete="off"
                required
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Address"
                placeholder="Address"
                fullWidth
                required
                multiline
                rows={3}
                name="address"
                value="Address1 Address2"
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                label="Branch"
                placeholder="Branch"
                fullWidth
                required
                name="branch"
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
                value={4}
              >
                <MenuItem value={0}>Select Branch</MenuItem>
                <MenuItem value={1}>Ahmedabad - HO</MenuItem>
                <MenuItem value={2}>Ahmedabad - Bapunagar</MenuItem>
                <MenuItem value={3}>Surat</MenuItem>
                <MenuItem value={4}>Rajkot</MenuItem>
                <MenuItem value={5}>Hyderabad</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Designation"
                placeholder="Designation"
                fullWidth
                required
                name="designation"
                value="BDM"
                InputProps={{
                  readOnly: true,
                }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Department"
                placeholder="Department"
                fullWidth
                required
                name="department"
                value="Business_Development"
                InputProps={{
                  readOnly: true,
                }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="products-label" shrink>
                  Products
                </InputLabel>
                <Select
                  labelId="products-label"
                  id="products"
                  multiple
                  fullWidth
                  value={productName}
                  onChange={handleChange}
                  input={<Input />}
                  renderValue={(selected) => (selected as string[]).join(", ")}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name} dense>
                      <Checkbox
                        checked={productName.indexOf(name) > -1}
                        size="small"
                      />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box width={1} display="flex" justifyContent="flex-end">
            <Button type="submit" className={classes.submit + " btn1 minW"}>
              Update
            </Button>
          </Box>
        </form>
        <Box width={1} display="flex" justifyContent="flex-start">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickOpen}
            className="linkBtn"
          >
            Change Password
          </Button>
          <Dialog
            open={OpenDialog}
            onClose={handleCloseDialog}
            aria-labelledby="form-dialog-title"
          >
            <ChangePassword />
          </Dialog>
        </Box>
      </div>
    </Paper>
  );
};
