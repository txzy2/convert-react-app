import './header.scss';
import {useTheme} from '../../shared/context/ChangeTheme';
import Switch from '../../shared/ui/SwitchButton';
import {User} from 'lucide-react';
import Hover from '../../shared/animations/Hover';

const Header = () => {
  const {isOn, toggleTheme} = useTheme();

  return (
    <div className='header'>
      {/* <Hover> */}
      {/*   <div className='header__container'> */}
      {/*     <User size={20} className='header__container--icon' /> */}
      {/**/}
      {/*     <p className='header__container--text'>#React App</p> */}
      {/*   </div> */}
      {/* </Hover> */}

      <Switch
        isOn={isOn}
        toggleTheme={toggleTheme}
        items={{start: '🌒', end: '☀️'}}
        style='toggle'
      />
    </div>
  );
};

export default Header;
