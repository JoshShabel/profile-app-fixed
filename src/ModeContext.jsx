import {createContext, useState} from 'react';

const ModeContext = createContext();
export default ModeContext;

export const ModeProvider = ({children}) => {
    const [isOn, setIsOn] = useState(false);
    const toggleOn = () => {setIsOn(prevIsOn => !prevIsOn)};
    console.log(children)
    return (
        < ModeContext.Provider value={{isOn, toggleOn}}>
            {children}
        </ModeContext.Provider>
    );
};
