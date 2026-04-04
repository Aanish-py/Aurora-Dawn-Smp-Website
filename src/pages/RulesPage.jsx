import { motion } from 'framer-motion';
const RulesBg = '/aurora_stock_photos/rules_newphoto.webp';

const RuleItem = ({ title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="group relative pb-4 mb-4 border-b border-dashed border-white/10 last:border-0 last:mb-0 last:pb-0"
    >
        <div className="flex gap-3 items-start">
            <div className="mt-1.5 flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.6)] group-hover:scale-125 transition-transform duration-300" />
            </div>
            <div className="space-y-0.5">
                <h3 className="text-lg font-bold text-white font-heading tracking-wide group-hover:text-purple-400 transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-white/60 leading-relaxed text-sm">
                    {description}
                </p>
            </div>
        </div>
    </motion.div>
);

const RulesPage = () => {
    const rules = [
        {
            title: "Be respectful to everyone",
            description: "We are a community built on kindness and inclusivity. Hate speech, racism, sexism, homophobia, transphobia, or discrimination of any kind is strictly prohibited. Treat all members with the respect they deserve."
        },
        {
            title: "Keep it clean",
            description: "Maintain a welcoming environment for all ages. NSFW content, sexual themes, gore, and offensive imagery are essentially forbidden in all channels. This rule extends to your Discord profile picture and nickname while on the server."
        },
        {
            title: "English only",
            description: "To ensure effective moderation and clear communication among all members, please use English in all public channels. DMs/Group chats are exempt from this rule."
        },
        {
            title: "No doxxing",
            description: "Your safety is paramount. Do not share, request, or threaten to leak personal or private information about any member. This includes real names, addresses, private photos, or social media profiles not publicly shared."
        },
        {
            title: "Use each channel properly",
            description: "Help keep the server organized by using channels for their intended purpose. Keep music commands in music channels, bot commands in bot channels, and general chat in general."
        },
        {
            title: "No self advertising",
            description: "Please respect our community space. Promoting other Discord servers, social media channels, or external content without explicit staff approval is not allowed in public chats or DMs."
        },
        {
            title: "No spamming",
            description: "Avoid flooding the chat. Repeated messages, excessive use of caps, mass mentions, or wall-of-text copy-pastes disrupt conversation and are considered spam."
        },
        {
            title: "Respect staff",
            description: "Our staff team works hard to keep the server safe. Follow their instructions and rulings. If you disagree with a decision, open a ticket instead of arguing in public channels."
        },
        {
            title: "Alts and Account switching",
            description: "To maintain a fair and transparent community, players are required to use only one primary account. Alternative accounts or frequent account switching are not permitted to bypass server restrictions or gain unfair advantages."
        },
        {
            title: "Follow discord TOS",
            description: "As a Discord community, we strictly adhere to Discord’s Terms of Service and Community Guidelines. Violating these platform-wide rules will result in immediate action."
        },
        {
            title: "No cheats",
            description: "The use of any unauthorized third-party software, including but not limited to hack clients, X-ray packs, kill aura, fly modes, or any other unfair modifications, is strictly prohibited. If you are uncertain whether a particular mod is allowed, please open a staff ticket for clarification."
        },
        {
            title: "No impersonation",
            description: "Do not log in or play using someone else’s username, whether a player or staff member. Impersonating others can cause confusion and disrupt the server, and it will not be tolerated."
        },
        {
            title: "No griefing",
            description: "This is a peaceful server and any type of griefing is strictly prohibited this also includes stealing/\"borrowing\" things with out permission"
        },
        {
            title: "Inventory Reroll",
            description: "If you die through natural causes your inventory will not get restored. If you die due to an ingame bug caused by our plugins/datapacks then it will get restored trying to abuse this will get you temporarily banned"
        },
        {
            title: "Respect PVP etiquette",
            description: "Having PVP toggled on does not mean that player is open to PVP. Always ask before attacking another player."
        },
        {
            title: "Begging And Favours",
            description: "Do not beg or DM staff/players for items, favors, or ability switching"
        }
    ];

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <img
                    src={RulesBg}
                    alt="Aurora SMP Server Rules and Community Guidelines"
                    loading="lazy"
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

                {/* Decorative gradients on top of image */}
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-aurora-green/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4 tracking-wider">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-white to-purple-400 animate-gradient-x">
                            SERVER RULES
                        </span>
                    </h1>
                    <div className="h-1 w-24 bg-purple-500 mx-auto rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
                </motion.div>

                <div className="bg-black/40 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 gap-y-2">
                        {rules.map((rule, index) => (
                            <RuleItem
                                key={index}
                                title={rule.title}
                                description={rule.description}
                                delay={index * 0.05}
                            />
                        ))}
                    </div>

                    {/* Additional Note for Mods */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="mt-6 pt-6 border-t border-white/10"
                    >
                        <div className="flex gap-3 items-start">
                            <div className="mt-1 flex-shrink-0">
                                <div className="w-2.5 h-2.5 rounded-full bg-aurora-green shadow-[0_0_10px_rgba(0,210,160,0.6)]" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-bold text-white font-heading tracking-wide">
                                    Allowed Mods
                                </h3>
                                <p className="text-white/70 leading-relaxed text-sm">
                                    We allow <span className="text-aurora-green">Freecam, BridgingMod, Fullbright, Litematica, ReplanterPlus, Xaero's MiniMap, and World Map</span>.
                                    If the mod you want to use is not listed here, please ask in 🆘│tickets for help.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default RulesPage;
