import React from 'react';
import Ad from './Ad';
import SponsoredContent from './SponsoredContent';

interface SidebarAdsProps {
  className?: string;
}

const SidebarAds: React.FC<SidebarAdsProps> = ({ className = '' }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Rectangle Ad */}
      <Ad size="rectangle" />

      {/* Sponsored Content */}
      <SponsoredContent
        title="Experience the Future of Banking"
        content="Discover innovative financial solutions with personalized service and cutting-edge technology for all your banking needs."
        sponsorName="STC Bank Nepal"
        link="https://www.stcnepal.com.np/"
      />

      {/* Square Ad */}
      <Ad size="square" />

      {/* Another Sponsored Content */}
      <SponsoredContent
        title="Stay Connected Anywhere"
        content="Fast, reliable internet connectivity for your home and business. Experience seamless browsing and streaming."
        sponsorName="Subisu"
        link="https://campaign.subisu.net.np/himalaya-times"
      />

      {/* Mobile Banner Ad */}
      <div className="md:hidden">
        <Ad size="mobile" />
      </div>
    </div>
  );
};

export default SidebarAds;