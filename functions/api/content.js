import initialData from '../../src/data/siteContent.json';

export async function onRequestGet(context) {
    const { env } = context;
    
    try {
        // Try to get content from KV
        // If KV binding is missing or empty, it will throw/return null
        const content = await env.AURORA_KV?.get('site_content');
        
        if (content) {
            return new Response(content, {
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (e) {
        console.error('KV Error:', e);
    }

    // Fallback to initial data from the repository
    return new Response(JSON.stringify(initialData), {
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function onRequestPost(context) {
    const { request, env } = context;
    
    // Simple password check for security
    const authHeader = request.headers.get('Authorization');
    if (authHeader !== 'Bearer aurora-admin-2026') {
        return new Response('Unauthorized Access', { status: 401 });
    }

    try {
        const newContent = await request.json();
        
        if (!env.AURORA_KV) {
            return new Response('Cloudflare KV not bound to project', { status: 500 });
        }

        // Save to KV with specific key
        await env.AURORA_KV.put('site_content', JSON.stringify(newContent));
        
        return new Response(JSON.stringify({ success: true }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
