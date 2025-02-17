import Stories from "stories-react";
import "stories-react/dist/index.css";
import { useState } from "react";

interface StoryProps {
  storyData: {
    url: string;
    type: string;
    duration: number;
    heading: string;
    subheading: string;
    profileImage: string;
    description: string;
  }[];
}

const Story: React.FC<StoryProps> = ({ storyData }) => {
  const [showStories, setShowStories] = useState(false);

  const handleStoriesEnd = () => {
    setShowStories(false);
  };

  const handleBackgroundClick = () => {
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
          onClick={handleBackgroundClick}
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
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "400px",
            }}
          >
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
            <div style={{ color: "white", marginTop: "10px", textAlign: "center" }}>
              {storyData[0].description}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Story;
