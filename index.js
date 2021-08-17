const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 4002;
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  switch (type) {
    case "PostCreated":
      const { id, title } = data;
      posts[id] = { id, title, comments: [] };
      break;
    case "CommentCreated":
      const { id, content, postId, status } = data;
      const post = posts[postId];
      post.comments.push({ id, content, status });
      break;
    case "CommentUpdated":
      const { id, content, postId, status } = data;
      const post = posts[postId];
      const comment = post.comments.find((comment) => comment.id === id);
      comment.status = status;
      comment.content = content;
      break;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", ({ body: { type, data } }, res) => {
  handleEvent(type, data);
  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
