import {useState} from 'react';
import TransitionAnimation from '../animations/Transition';
import {SwitchProps} from '../../types/types';

const Switch = ({isOn, toggleTheme, items, style = 'toggle'}: SwitchProps) => {
  const [checked, setChecked] = useState(isOn);

  const handleToggle = () => {
    setChecked(!checked);
    toggleTheme();
  };

  return (
    <>
      {style === 'toggle' ? (
        <div
          className={checked ? 'switch' : 'switch-dark'}
          data-ison={checked}
          onClick={handleToggle}
        >
          <TransitionAnimation>
            {checked ? items.start : items.end}
          </TransitionAnimation>
        </div>
      ) : (
        <>
          <input
            type='button'
            className='switch--radio'
            value={isOn ? items.start : items.end}
            data-ison={checked}
            onClick={handleToggle}
          />
        </>
      )}
    </>
  );
};

export default Switch;
