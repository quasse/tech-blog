async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("input[name='blog-title']").value.trim();
  const blog_text = document
    .querySelector("textarea[name='blog-text']")
    .value.trim();
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/blogs/${id}`, {
    method: "put",
    body: JSON.stringify({
      title,
      blog_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".edit-blog-form")
  .addEventListener("submit", editFormHandler);
