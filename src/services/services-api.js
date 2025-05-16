export const fetchServices = async () => {
    const response = await fetch('http://localhost/portfolio/api/services.php');
    const data = await response.json();
    return data;
  };