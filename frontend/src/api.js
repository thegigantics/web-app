const API_URL = import.meta.env.VITE_API_URL;

export async function fetchBlogs() {
  try {
    const response = await fetch(`${API_URL}/blogs`);
    if (!response.ok) throw new Error("Failed to fetch blogs");
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export async function createBlog(blogData) {
  try {
    const response = await fetch(`${API_URL}/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error creating blog:", error);
  }
}
