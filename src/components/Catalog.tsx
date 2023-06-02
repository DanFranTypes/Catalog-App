import React, { useEffect, useState } from 'react';
import './Catalog.css';

const Catalog: React.FC = () => {
  const [catalogData, setCatalogData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch the catalog data from the file
    const fetchCatalogData = async () => {
      try {
        const response = await fetch('/catalog.json');
        const data = await response.json();
        setCatalogData(data);
      } catch (error) {
        console.error('Error fetching catalog data:', error);
      }
    };

    fetchCatalogData();
  }, []);

  return (
    <div>
      <h1>Catalog</h1>
      {catalogData.map((item) => (
        <div key={item.Code}>
          {item.Cost ? (
            <div>
              <h3>
                {item.Description}
              </h3>
              <p>
                <span> Cost: {item.Cost} | |   </span> 
                <span> OM: {item.OM} | | </span> 
                <span> Code: {item.Code}</span> 
              </p>
            </div>
          ) : (
            <p style={{ fontWeight: 'bold', fontSize: '1.2em', textDecoration: 'underline' }}>
              {item.Description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default Catalog;
