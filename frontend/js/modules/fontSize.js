import { setCookie } from './cookie';
const fontSize = () =>{

    const addAcess = () =>{
        let elements = document.getElementsByTagName('*');
        for (let element of elements) {
          element.classList.add('fnc-acessibility');
        }
    }
    
    const getComputedFont = (seletorAcessibility) =>{
        let sizeFont = window.getComputedStyle(seletorAcessibility, null).getPropertyValue('font-size');
        return parseFloat(sizeFont);
    }
    
    const changeSizeFonts = (seletorAcessibility, aumentar, normal) => {
    
        for (let i = 0; i < seletorAcessibility.length; i++) {
            const element = seletorAcessibility[i]; 
            let sizeFontCur = 0;
    
            if (normal) {
                element.style.fontSize = '';
                setCookie('font-size', element.style.fontSize = '');
            } else {        
                if (aumentar){
                    sizeFontCur = getComputedFont(element) + 0.5;
                }
                else{
                    sizeFontCur = getComputedFont(element) - 0.5;            
                }
                
                element.style.fontSize = sizeFontCur.toString() + 'px'; 
                setCookie('font-size', element.style.fontSize = sizeFontCur.toString() + 'px');
            }
        } 
    }
    
    let acessibilityClass = document.getElementsByClassName('fnc-acessibility');
    let increaseFont = document.querySelectorAll('.increase-font');
    let decreaseFont = document.querySelectorAll('.decrease-font');
    let normalFont = document.querySelectorAll('.normal-font');
    
    window.addEventListener('load', () => {
        for (let i = 0; i < increaseFont.length; i++) {
            const element = increaseFont[i];            
            element.addEventListener('click', e => {
                e.preventDefault();
                addAcess();
                changeSizeFonts(acessibilityClass, true);
            });
        }

        for (let i = 0; i < normalFont.length; i++) {
            const element = normalFont[i];            
            element.addEventListener('click', e => {
                e.preventDefault();
                addAcess();
                changeSizeFonts(acessibilityClass, null, true);
            });
        }

        for (let i = 0; i < decreaseFont.length; i++) {
            const element = decreaseFont[i];            
            element.addEventListener('click', e => {
                e.preventDefault();
                addAcess();
                changeSizeFonts(acessibilityClass, false);
            });
        }
    })    


}

export{ fontSize };