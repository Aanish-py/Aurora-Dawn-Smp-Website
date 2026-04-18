"use client"

import * as React from "react"
import { useContent } from "@/context/ContentContext"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Moon, Send, Sun } from "lucide-react"
import { FaDiscord, FaYoutube } from "react-icons/fa"

function Footerdemo() {
    const [isDarkMode, setIsDarkMode] = React.useState(true)
    const navigate = useNavigate()

    React.useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [isDarkMode])

    const { content } = useContent();
    const discordLink = content?.socialLinks?.find(l => l.platform === 'Discord')?.url || "https://dsc.gg/AuroraDawn";
    const youtubeLink = content?.socialLinks?.find(l => l.platform === 'YouTube')?.url || "https://youtube.com/@auroradawnsmp";

    return (
        <footer className="relative border-t border-white/10 bg-black text-white transition-colors duration-300">
            <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
                    <div className="relative">
                        <h2 className="mb-4 text-3xl font-heading font-bold tracking-tight text-aurora-green">Stay Connected</h2>
                        <p className="mb-6 text-zinc-400">
                            Join our newsletter for the latest updates and exclusive offers.
                        </p>
                        <form className="relative">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="pr-12 backdrop-blur-sm bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-aurora-green"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-aurora-green text-aurora-dark hover:bg-aurora-green/90"
                            >
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Subscribe</span>
                            </Button>
                        </form>
                        <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-aurora-green/10 blur-2xl" />
                    </div>

                    <div className="grid grid-cols-2 gap-8 lg:col-span-2">
                        <div>
                            <h3 className="mb-4 text-lg font-semibold text-aurora-blue">Server Info</h3>
                            <nav className="space-y-2 text-sm text-zinc-400">
                                <a href="/" className="block transition-colors hover:text-aurora-green">Home</a>
                                <a href="/join" className="block transition-colors hover:text-aurora-green">Join Server</a>
                                <a href="/rules" className="block transition-colors hover:text-aurora-green">Server Rules</a>
                                <a href="/announcements" className="block transition-colors hover:text-aurora-green">Announcements</a>
                                <a href="/lore" className="block transition-colors hover:text-aurora-green">Lore</a>
                            </nav>
                        </div>

                        <div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row">
                    <p className="text-sm text-zinc-500 relative inline-block">
                        © 2026 Aurora Dawn SMP. Not affiliated with Mojang AB.
                        <span 
                            onClick={() => navigate('/portal-terminal-x77')}
                            className="absolute -right-2 bottom-0 w-1 h-1 bg-white/5 cursor-pointer hover:bg-aurora-green/20 hover:shadow-[0_0_8px_rgba(0,210,160,0.4)] rounded-full transition-all duration-500"
                            title="Access Restricted"
                        />
                    </p>

                    <div className="flex items-center space-x-4">
                        {/* Social icons kept but styled for dark theme */}
                        <div className="flex space-x-2">
                            <a href={discordLink} target="_blank" rel="noopener noreferrer">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-[#5865F2] hover:bg-[#5865F2]/10">
                                    <FaDiscord className="h-4 w-4" />
                                </Button>
                            </a>
                            <a href={youtubeLink} target="_blank" rel="noopener noreferrer">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-[#FF0000] hover:bg-[#FF0000]/10">
                                    <FaYoutube className="h-4 w-4" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export { Footerdemo }
