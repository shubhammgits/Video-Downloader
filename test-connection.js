// Simple test script to verify frontend-backend communication
fetch('http://localhost:3001/api/health')
  .then(response => response.json())
  .then(data => {
    console.log('Backend connection successful:', data);
  })
  .catch(error => {
    console.error('Backend connection failed:', error);
  });