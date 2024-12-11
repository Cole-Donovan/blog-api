import { useState, useEffect } from "react";
import BlogPost from "../components/BlogPost";

const DraftsPage = () => {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts?published=false", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDrafts(data); // Store fetched drafts
        } else {
          console.error("Failed to fetch drafts");
        }
      } catch (err) {
        console.error("Error fetching drafts:", err);
      }
    };

    fetchDrafts();
  }, []);

  return (
    <div>
      <h1>Drafts</h1>
      {drafts.length === 0 ? (
        <p>No drafts available</p>
      ) : (
        <div>
          {drafts.map((draft) => (
            <BlogPost key={draft.id} post={draft} viewMode="draft" />
          ))}
        </div>
      )}
    </div>
  );
};

export default DraftsPage;
