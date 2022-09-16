'use strict';
const root = document.getElementById('root');
const btn = document.getElementById('open-modal-id');

function closeModalHandler() {
    document.getElementById('modal').innerHTML = '';
}

btn.addEventListener('click', () => {
    const div = new Component().render();
    document.getElementById('modal').append(div);
});

function createElement(type, props, ...children) {
    const element = document.createElement(type);
    element.append(...children);
    if(props) {
        const keys = Object.keys(props);
        keys.forEach((key)=>{
            if(key === 'classes') {
                element.classList.add(...props[key]);
            }
            if(key === 'listeners') {
                props[key].forEach(([eventName, listener, opts]) => {
                   element.addEventListener(eventName, listener, opts);
                });
            }
            element.setAttribute(key, props[key]); // TODO: check false boolean
        })
    }
    return element;
}

class Component {
    constructor(){}
    render(){
        return (
        createElement('div', {classes:['modal-window','center']},
            createElement('div', { classes: ['close-button'], listeners: [ [ 'click', closeModalHandler ] ] }, 
                'CLOSE',
            ),
            createElement('span', null, 
                'CONTENT',
            ),
        )
    );
    }
}
