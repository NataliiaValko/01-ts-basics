import axios from "axios";

async function fetchPosts(): Promise<Post[]> {
  const response = await axios.get<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return response.data;
}

fetchPosts().then((posts) => {
  // posts.forEach((post) => console.log(post.title));
  console.log(posts[0].title);
});

interface Post {
  id: number;
  title: string;
  body: string;
}
