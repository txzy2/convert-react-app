import {motion} from 'framer-motion';

const TransitionAnimation = ({children}: {children: any}) => (
  <motion.div
    className='handle'
    layout
    transition={{type: 'spring', stiffness: 700, damping: 30}}
  >
    {children}
  </motion.div>
);

export default TransitionAnimation;
