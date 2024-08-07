import {ReactNode} from 'react';
import {motion} from 'framer-motion';

interface AnimationWrapperProps {
  children: ReactNode;
}

//NOTE: Sample FadeIn animation
const FadeIn = ({children}: AnimationWrapperProps) => {
  return (
    <motion.div
      initial={{opacity: 0, scale: 0.5}}
      animate={{opacity: 1, scale: 1}}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
