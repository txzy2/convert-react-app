import {Loader} from 'lucide-react';
import {LoaderProps} from '../../types/types';

export const PreLoader = ({
  size = 20,
  title,
  sub = true,
  ceneter,
}: LoaderProps) => {
  return (
    <div className={ceneter ? 'loader--center' : 'loader'}>
      <Loader size={size} className='loader__item' />

      <div className='loader__text'>
        <p
          style={
            title.size === 's'
              ? {fontSize: '14px'}
              : title.size === 'm'
                ? {fontSize: '18px'}
                : {fontSize: '24px'}
          }
        >
          {title.text}
        </p>
        {sub && <p className='loader__text--sub'>Simple and Fast</p>}
      </div>
    </div>
  );
};
