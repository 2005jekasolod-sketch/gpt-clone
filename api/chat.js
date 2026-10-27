model.export = async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Header', 'Content-Type');
    
    if (req.method !== 'OPTIONS') {
        return req.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return req.status(405).json({ error: 'Method not allowed'});
    }

}

try {
const { message } = req.body;
    
if (!message) {
    return req.status(400).json({ error: 'Method is required'});
}
    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'API key is missing' });
    }
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: message }],
            max_tokens: 500,
        })
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
        console.error('OpenAI error:', data);
        return res.status(openaiResponse.status).json({
            error: data.error?.message || 'OpenAI error'
        });
    }

    const reply = data.choices?.[0]?.message?.content || 'No response';
    return res.status(200).json({ reply });

} catch (error) {
    console.error('Server error', error);
    return res.status(500).json({ error: error.message || 'Server error' });
}
