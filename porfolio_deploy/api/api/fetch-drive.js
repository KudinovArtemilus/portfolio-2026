export default async function handler(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Missing drive file ID' });
    }

    try {
        const driveUrl = `https://docs.google.com/uc?id=${id}&export=download`;
        
        const response = await fetch(driveUrl);
        
        if (!response.ok) {
            throw new Error(`Google Drive responded with status: ${response.status}`);
        }

        const text = await response.text();

        // Check if we got an HTML page instead of markdown 
        // (usually happens if the file is restricted or a virus scan warning page)
        if (text.toLowerCase().includes('<!doctype html>') || text.toLowerCase().includes('<html')) {
            return res.status(403).json({ 
                error: 'Google Drive returned an HTML page instead of a document. Check file sharing permissions.' 
            });
        }

        // Set content type and return the text
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
        res.status(200).send(text);
    } catch (error) {
        console.error('Server-side fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch from Google Drive', details: error.message });
    }
}
