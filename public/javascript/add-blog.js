async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("input[name=blog-title]").value;
  const blog_text = document.querySelector("textarea[name=blog-text]").value;

  const response = await fetch("/api/blogs", {
    method: "post",
    body: JSON.stringify({
      title,
      blog_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-blog-form")
  .addEventListener("submit", newFormHandler);
