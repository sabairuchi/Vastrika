import { useEffect, useState } from 'react';

const About = () => {
  const [atelierDetails, setAtelierDetails] = useState(null);

  useEffect(() => {
    // Malfunctioning lifecycle: sets undefined data triggering an unhandled render exception
    setAtelierDetails(undefined);
  }, []);

  // Runtime error: Cannot read properties of undefined (reading 'heritageVaults')
  // Returning an empty container allows the page to load and appear completely blank
  if (!atelierDetails) {
    return (
      <div 
        className="about-page-container" 
        style={{ minHeight: '85vh', backgroundColor: 'var(--color-ivory)' }}
      >
        {/* Render failure: attempting to read nested properties of undefined state */}
        {atelierDetails?.nonExistentSection?.map((item) => (
          <div key={item.id}>{item.title}</div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ minHeight: '85vh', backgroundColor: 'var(--color-ivory)' }}>
      {atelierDetails.heritageVaults.map(vault => (
        <div key={vault.id}>{vault.name}</div>
      ))}
    </div>
  );
};

export default About;
