const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4002;
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", ({ body: { type, data } }, res) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    posts[postId].comments = [
      ...posts[postId].comments,
      { id, content, status },
    ];
  }

  console.log(posts);
  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
