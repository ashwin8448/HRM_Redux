// Assuming data.json is in the public folder
const fetchData = async () => {
    try {
        const response = await fetch('/data.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
export default fetchData;