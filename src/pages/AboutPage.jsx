import { useState, useEffect } from "react";
import { Box } from "@mui/material";

function AboutPage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        padding: "20px",
        maxWidth: "1600px",
        margin: "0 auto",
      }}
    >
      <div style={{ flex: 2, lineHeight: "1.6", paddingRight: isMobile ? 0 : "30px", width: isMobile ? "100%" : undefined }}>
        <h1>About Us</h1>
        <p>
          Welcome to our advanced business card management platform! We provide a comprehensive and simple solution for managing digital business cards,
          designed to help entrepreneurs, business owners, and professionals build an impressive and professional digital presence.
        </p>
        <p>
          Our system was developed using the most advanced technologies including React and Vite, providing a smooth and fast user experience.
          With our platform, you can create, edit, and manage interactive business cards that include all the essential information for your customers.
        </p>
        <p>
          We offer an intuitive user interface that allows for design and customization of business cards, adding images, detailed contact information,
          links to social media sites, and additional information relevant to your business. All cards created in our system are responsive
          and optimized for viewing on all devices - computers, tablets, and smartphones.
        </p>
        <p>
          The platform includes an advanced user management system with high-level data security, the ability to save cards to favorites,
          and advanced sharing features. We believe that every business deserves a professional and accessible digital presence, so we developed a solution
          that suits all types of businesses and budgets.
        </p>
        <p>
          Our development team works continuously on improving the system and adding new features, while listening to user feedback and following
          the latest trends in the digital world. We invite you to join our user community and enjoy an advanced digital experience.
        </p>
        <p>
          Whether you're a freelancer looking to showcase your skills, a startup building brand recognition, or an established company seeking
          to modernize your networking approach, our platform provides the tools and flexibility you need to succeed in today's digital marketplace.
        </p>
        <p>
          You can try our service online on modern Vercel hosting: <a href="https://cards-proj-boris-main.vercel.app" target="_blank" rel="noopener noreferrer">Demo Site</a>.
        </p>
      </div>
      <div style={{ flex: 1, display: "flex", justifyContent: "center", marginTop: isMobile ? 30 : 75 }}>
        <img src="/Batman.jpg" alt="Batman" style={{ maxWidth: "300px", width: "100%", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }} />
      </div>
    </div>
  );
}

export default AboutPage;
