import BlogPostList from "../components/BlogPostList";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-center">Welcome to Your Blog</h1>
      <BlogPostList viewMode="published" /> {/* Pass 'published' to fetch published posts only */}
    </div>
  );
};

export default HomePage;
