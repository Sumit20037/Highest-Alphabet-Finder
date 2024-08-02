document.getElementById('submitBtn').addEventListener('click', async () => {
    const jsonInput = document.getElementById('jsonInput').value;
    const responseOptions = Array.from(document.getElementById('responseOptions').selectedOptions).map(option => option.value);
    const responseContainer = document.getElementById('responseContainer');

    try {
        const parsedData = JSON.parse(jsonInput);

        const res = await fetch('https://your-heroku-app.herokuapp.com/bfhl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(parsedData)
        });

        const data = await res.json();

        let filteredData = {
            numbers: responseOptions.includes('Numbers') ? data.numbers : [],
            alphabets: responseOptions.includes('Alphabets') ? data.alphabets : [],
            highest_alphabet: responseOptions.includes('Highest alphabet') ? data.highest_alphabet : []
        };

        responseContainer.innerHTML = `<h3>Response:</h3><pre>${JSON.stringify(filteredData, null, 2)}</pre>`;
    } catch (error) {
        responseContainer.innerHTML = `<div style="color: red;">Invalid JSON input or API error: ${error.message}</div>`;
    }
});
