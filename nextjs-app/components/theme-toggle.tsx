'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => mounted && setTheme(theme === 'light' ? 'dark' : 'light')}
      className="w-9 h-9 relative overflow-hidden border-2 hover:bg-primary/10 transition-colors"
      aria-label="Toggle theme"
    >
      {!mounted ? (
        <Sun className="h-5 w-5" />
      ) : (
        <>
          <motion.div
            initial={{ rotate: 0, scale: 1 }}
            animate={{ 
              rotate: theme === 'dark' ? 0 : 180,
              scale: theme === 'dark' ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute"
          >
            <Moon className="h-5 w-5" />
          </motion.div>
          <motion.div
            initial={{ rotate: 180, scale: 0 }}
            animate={{ 
              rotate: theme === 'light' ? 0 : 180,
              scale: theme === 'light' ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute"
          >
            <Sun className="h-5 w-5" />
          </motion.div>
        </>
      )}
    </Button>
  );
}
