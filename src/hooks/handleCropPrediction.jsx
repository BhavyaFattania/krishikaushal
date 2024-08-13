export const handleSubmit = async (e, soilType, climate, previousYield, setLoading, setError, setPrediction) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction(null);

    const data = {
        soilType,
        climate,
        previousYield
    };

    try {
        const URL = process.env.REACT_APP_CROP_PREDICATION;
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setPrediction(result);
    } catch (err) {
        setError('An error occurred while predicting the crop.');
    } finally {
        setLoading(false);
    }
};