export const fetchServerStats = async (ip) => {
    try {
        const response = await fetch(`https://api.mcsrvstat.us/3/${ip}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return {
            online: data.online,
            players: {
                online: data.players?.online || 0,
                max: data.players?.max || 0
            },
            version: data.version || '',
            motd: data.motd?.html || []
        };
    } catch (error) {
        console.error("Failed to fetch server stats:", error);
        return {
            online: false,
            players: { online: 0, max: 0 },
            version: '',
            motd: []
        };
    }
};
