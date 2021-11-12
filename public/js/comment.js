const newCommentHandler = async (event) => {
  event.preventDefault();

  const comment_text = document.querySelector("#comment").value.trim();

  const post_id = document.getElementById("postid").innerHTML;

  if (comment_text) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ comment_text, post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to create comment");
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", newCommentHandler);
