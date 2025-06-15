
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";

// Import new NEET components
import NEETHeader from "@/components/neet/NEETHeader";
import NEETSearch from "@/components/neet/NEETSearch";
import NEETTabs from "@/components/neet/NEETTabs";

const NEETPrep = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
      setSearchQuery(query);
      // Implement search filtering logic here
      console.log("Searching for:", query);
  }

  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        <NEETHeader />
        <NEETSearch onSearch={handleSearch} />
        <NEETTabs />
      </main>

      <Footer />
      <EmailPopup />
    </>
  );
};

export default NEETPrep;
