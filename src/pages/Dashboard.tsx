import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { startSession, stopSession, type StartSessionPayload } from '../api/sessions';
import { Play, Pause, Square, ChevronDown, RotateCcw } from 'lucide-react';

export const Dashboard: React.FC = () => {
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [formData, setFormData] = useState<StartSessionPayload>({
        user_id: "1", // Changed to string "1" to likely match your Go backend int parsing if using JSON numbers, or check your backend contract
        course_id: '',
        module: 'Module 1',
        topic: '',
        activity_type: 'coding',
    });

    // --- Timer Logic ---
    useEffect(() => {
        let interval: number;
        if (isSessionActive) {
            interval = setInterval(() => setElapsedSeconds((prev) => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isSessionActive]);

    // --- Mutations ---
    const startMutation = useMutation({
        mutationFn: startSession,
        onSuccess: () => {
            setIsSessionActive(true);
            setElapsedSeconds(0);
        },
        onError: (err) => alert("Failed to start: " + err.message)
    });

    const stopMutation = useMutation({
        mutationFn: stopSession,
        onSuccess: () => {
            setIsSessionActive(false);
            setFormData(prev => ({ ...prev, course_id: '', topic: '' }));
        },
    });

    const handleStart = () => {
        if (!formData.course_id || !formData.topic) {
            alert("Please enter a Course ID and Topic first");
            return;
        }
        startMutation.mutate(formData);
    };

    const handleStop = () => {
        // Assuming user_id is consistent
        stopMutation.mutate({ user_id: formData.user_id, notes: '' });
    };

    // --- Formatting ---
    const formatBigTimer = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="max-w-5xl mx-auto flex flex-col h-full">
            {/* Header */}
            <header className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-medium text-slate-200">Time Tracker</h1>
                    <span className="px-2 py-0.5 bg-[#1A1A23] text-slate-500 text-xs rounded-full border border-white/5">3</span>
                </div>
            </header>

            {/* Main Timer Area */}
            <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">

                {/* Project "Dropdown" (Actually Inputs) */}
                <div className="mb-12 relative group">
                    <div className="flex items-center gap-2 bg-[#1A1A23] border border-white/5 px-4 py-2 rounded-full hover:border-white/10 transition-colors">
                        <span className="text-slate-500 text-sm">Project:</span>
                        <input
                            className="bg-transparent border-none focus:ring-0 text-slate-200 text-sm placeholder-slate-600 w-24 text-center"
                            placeholder="Course ID"
                            value={formData.course_id}
                            onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
                        />
                        <span className="text-slate-700">/</span>
                        <input
                            className="bg-transparent border-none focus:ring-0 text-slate-200 text-sm placeholder-slate-600 w-32"
                            placeholder="Topic..."
                            value={formData.topic}
                            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        />
                        <ChevronDown className="w-4 h-4 text-slate-600 ml-2" />
                    </div>
                </div>

                {/* Big Timer Display */}
                <div className="text-8xl md:text-9xl font-light tabular-nums tracking-tight text-slate-200 mb-4 select-none">
                    {formatBigTimer(elapsedSeconds)}
                </div>

                <p className="text-slate-500 font-medium mb-12">
                    Total time tracked today: <span className="text-slate-400">3h 45m</span>
                </p>

                {/* Controls */}
                <div className="flex items-center gap-6">
                    {!isSessionActive ? (
                        /* START BUTTON (Gradient) */
                        <button
                            onClick={handleStart}
                            className="group relative flex items-center justify-center"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-2xl text-white transform transition-transform group-active:scale-95">
                                <Play className="w-8 h-8 fill-current ml-1" />
                            </div>
                        </button>
                    ) : (
                        /* STOP / PAUSE CONTROLS */
                        <>
                            <button className="flex flex-col items-center gap-2 group">
                                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/5 hover:text-white transition-all">
                                    <span className="text-xs font-medium">Reset</span>
                                </div>
                            </button>

                            <button className="flex flex-col items-center gap-2 group">
                                <div className="w-16 h-16 rounded-full bg-[#1A1A23] border border-white/10 flex items-center justify-center text-white hover:bg-[#252530] transition-all">
                                    <Pause className="w-6 h-6 fill-current" />
                                </div>
                            </button>

                            <button
                                onClick={handleStop}
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-red-500 hover:bg-red-500/10 hover:border-red-500/50 transition-all">
                                    <Square className="w-5 h-5 fill-current" />
                                </div>
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Footer / Recent List */}
            <div className="mt-auto pt-12">
                <div className="flex justify-between text-xs font-medium text-slate-500 mb-4 px-4">
                    <span>Tue, June 15</span>
                    <span>Total: 01:34:23</span>
                </div>

                <div className="space-y-1">
                    {[1, 2].map((item, i) => (
                        <div key={i} className="group flex items-center justify-between p-4 rounded-xl hover:bg-[#1A1A23] transition-colors cursor-default border border-transparent hover:border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 rounded-lg bg-[#1A1A23] border border-white/5 flex items-center justify-center group-hover:bg-[#252530]">
                                    <span className="text-slate-500 font-mono text-xs">CS</span>
                                </div>
                                <div>
                                    <div className="text-slate-300 text-sm font-medium">Mochary Method</div>
                                    <div className="text-slate-600 text-xs">Marketing • Billable</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="text-slate-400 font-mono text-sm">00:53:42</span>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play className="w-4 h-4 text-slate-500 hover:text-white cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
