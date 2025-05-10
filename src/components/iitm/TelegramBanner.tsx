
import React from "react";
import { Button } from "@/components/ui/button";

const TelegramBanner = () => {
  return (
    <div className="bg-[#3498db]/10 p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 flex flex-col md:flex-row items-center mb-4 md:mb-0">
          <div className="bg-white p-2 rounded-lg shadow-md mb-4 md:mb-0 md:mr-6">
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://t.me/iitm_bs_community" 
              alt="Telegram Group QR Code" 
              className="w-32 h-32" 
            />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Join 5000+ IITM BS Students Community</h3>
            <p className="text-gray-600">
              Get help with your coursework, share resources, and connect with peers through our active Telegram community.
            </p>
          </div>
        </div>
        <div>
          <Button 
            className="bg-[#0088cc] hover:bg-[#0088cc]/90 text-white"
            asChild
          >
            <a href="https://t.me/iitm_bs_community" target="_blank" rel="noopener noreferrer">
              Join Telegram Group
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TelegramBanner;
