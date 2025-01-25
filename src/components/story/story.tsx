import Stories from "stories-react";
import "stories-react/dist/index.css";
import { useState } from "react";

const storyData = [
  {
    url: "https://example.com/image1.jpg",
    type: "image",
    duration: 5000,
    heading: "کاربر ۱",
    subheading: "۲ ساعت پیش",
    profileImage: "https://example.com/profile1.jpg",
  },
  {
    url: "https://example.com/image2.jpg",
    type: "image",
    duration: 5000,
    heading: "کاربر ۲",
    subheading: "۵ ساعت پیش",
    profileImage: "https://example.com/profile2.jpg",
  },
];

const Story = () => {
  const [showStories, setShowStories] = useState(false);

  const handleStoriesEnd = () => {
    setShowStories(false);
  };

  return (
    <>
      <div
        onClick={() => setShowStories(true)}
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          border: "3px solid #e1306c",
          padding: "3px",
          cursor: "pointer",
          margin: "20px",
          position: "relative",
        }}
      >
        <img
          src={storyData[0].profileImage}
          alt="story"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: "-20px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "12px",
            whiteSpace: "nowrap",
          }}
        >
          {storyData[0].heading}
        </span>
      </div>
      {showStories && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <button
              onClick={() => setShowStories(false)}
              style={{
                position: "absolute",
                top: "-40px",
                right: "10px",
                background: "none",
                border: "none",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
                zIndex: 1001,
              }}
            >
              ✕
            </button>
            <Stories
              stories={storyData}
              width="100%"
              height="600px"
              defaultInterval={5000}
              onAllStoriesEnd={handleStoriesEnd}
              storyStyles={{
                borderRadius: "8px",
                overflow: "hidden",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Story;
