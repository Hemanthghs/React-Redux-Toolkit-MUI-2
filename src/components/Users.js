import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, updateUser } from "../redux/userSlice";
import { CssBaseline } from "@mui/material";
import { Card } from "@mui/material";
import { Box } from "@mui/material";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Edit, Padding } from "@mui/icons-material";
import { Container } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

const Users = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const { data } = useSelector((store) => store.users);
  const dispatch = useDispatch();

  return (
    <div>
      <CssBaseline />
      <Container style={{ marginTop: "20px" }}>
        <Typography variant="h3" align="center">
          - Users Data -
        </Typography>
      </Container>
      <Container style={{ marginTop: "30px" }}>
        {data.length > 0 &&
          data.map((user, index) => (
            <Card style={{ margin: "10px" }}>
              <Box
                sx={{ p: 2, display: "flex", justifyContent: "space-around" }}
              >
                <Avatar
                  sx={{ bgcolor: deepOrange[500] }}
                  variant="rounded"
                  src=""
                >
                  {user.name[0]}
                </Avatar>
                <Typography fontSize={24} fontWeight={700}>
                  {user.name}
                </Typography>
                <IconButton
                  sx={{ fontSize: 24 }}
                  onClick={() => {
                    setUserId(user.id);
                    setName(user.name);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  sx={{ fontSize: 24 }}
                  onClick={() => dispatch(deleteUser(user.id))}
                >
                  <Delete />
                </IconButton>
              </Box>
            </Card>
          ))}
      </Container>

      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        id="outlined-basic"
        label="Enter name"
        variant="outlined"
      />
      <Button
        sx={{ height: "54px", fontWeight: "700", marginLeft: "8px" }}
        variant="contained"
        onClick={() => {
          if (userId) {
            console.log({ id: userId, name: name });
            dispatch(updateUser({ id: userId, name: name }));
            setName("");
            setUserId("");
          } else {
            dispatch(addUser({ name }));
            setName("");
          }
        }}
      >
        {userId ? "Update" : "Add User"}
      </Button>
      <br />
    </div>
  );
};

export default Users;
