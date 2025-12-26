'use client';

import Image from 'next/image';
import { Minimize, Maximize, X } from '@/components/ui/icons';

export function HeaderBar() {
  return (
    <header className="h-10 bg-black/80 border-b border-white/5 flex items-center justify-between px-4 select-none">
      {/* Left side - Logo and app name */}
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/icons/32x32.png"
            alt="Sweesh Logo"
            width={24}
            height={24}
          />
          <span className="text-white font-display font-semibold text-sm">
            Sweesh
          </span>
        </div>
        <span className="text-xs text-white/40 font-mono">GLM SweeshBench - 2 Shot</span>
      </div>

      {/* Right side - Window controls (visual only) */}
      <div className="flex items-center gap-1">
        <button className="w-10 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors">
          <Minimize className="h-3 w-3" />
        </button>
        <button className="w-10 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-colors">
          <Maximize className="h-3 w-3" />
        </button>
        <button className="w-10 h-8 flex items-center justify-center text-white/60 hover:text-red-500 hover:bg-red-500/10 transition-colors">
          <X className="h-3 w-3" />
        </button>
      </div>
    </header>
  );
}
