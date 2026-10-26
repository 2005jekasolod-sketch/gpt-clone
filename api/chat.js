export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return req.status(405).json({ error: 'Method not allowed'});
    }

}

const { message } = req.body;
if (!message || message.trim() === '') {
    return req.status(405).json({ error: 'Method is required'});
}

try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'user', content: message }
            ],
            max_tokens: 500,
            temperature: 0.7
        })
    });

    const data = await response.json();

    if (!response.ok) {
        return res.status(response.status).json({
            error: data.error?.message || 'OpenAI API error'
        });
    }

    const reply = data.choices[0].message.content;
    res.status(200).json({ reply });

} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong on the server '});
}