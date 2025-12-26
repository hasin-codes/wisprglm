'use client';

import { motion } from 'framer-motion';
import { Bell, Settings, User } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/lib/store';

const icons = [
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'settings', icon: Settings, label: 'Settings' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export function IconRail() {
  const { openModal } = useUIStore();

  return (
    <nav
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2"
      aria-label="Main actions"
    >
      {icons.map(({ id, icon: Icon, label }) => (
        <motion.div
          key={id}
          whileHover={{ scale: 1.1, x: 4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              openModal(
                id as 'settings' | 'notifications' | 'profile' | 'detail'
              )
            }
            className={`
              h-12 w-12 rounded-xl bg-white/5 backdrop-blur-sm
              border border-white/10
              text-white/70 hover:text-white hover:bg-white/10
              transition-all duration-200
              shadow-lg hover:shadow-xl hover:shadow-red-900/10
              hover:border-red-900/30
            `}
            aria-label={label}
          >
            <Icon className="h-5 w-5" />
          </Button>
        </motion.div>
      ))}
    </nav>
  );
}
