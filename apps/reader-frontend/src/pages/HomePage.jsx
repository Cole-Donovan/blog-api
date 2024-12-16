import BlogPostList from "../components/BlogPostList";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-center">Welcome to Cole's Blog!</h1>
      <BlogPostList /> {/* Pass 'published' to fetch published posts only */}
    </div>
  );
};

export default HomePage;
