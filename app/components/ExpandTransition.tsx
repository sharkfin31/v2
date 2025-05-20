'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ExpandTransitionProps {
  children: React.ReactNode;
  isExpanding: boolean;
  onAnimationComplete?: () => void;
}

const ExpandTransition = ({ children, isExpanding, onAnimationComplete }: ExpandTransitionProps) => {
return (
    <AnimatePresence>
      {isExpanding && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 bg-background z-50"
          onAnimationComplete={onAnimationComplete}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExpandTransition;