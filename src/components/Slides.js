import React, { useRef, useEffect, useReducer } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'incremented': {
            return {
                count: state.count + 1
            };
        }
        case 'decremented': {
            return {
                count: state.count - 1
            };
        }
        case 'default':
            return {
                count: 0
            };
    }
}

function Slides({ slides }) {
    const initialState = { count: 0 };

    const [state, dispatch] = useReducer(reducer, initialState);

    function changeSlide(num) {
        if (state.count == 0) {
            prv.current.disabled = true;
        }

        if (state.count == 4) {
            nxt.current.disabled = true;
        }

        if (num == 1 && state.count > 0) {
            nxt.current.disabled = false;
            dispatch({ type: 'decremented' });
        } else if (num == 2 && state.count < 4) {
            prv.current.disabled = false;
            dispatch({ type: 'incremented' });
        } else if (num == 0) {
            nxt.current.disabled = false;
            prv.current.disabled = true;
            dispatch({ type: 'default' });
        }

    }

    useEffect(() => {
        console.log(slides);
        changeSlide(0)
    }, [])


    const nxt = useRef();
    const prv = useRef();

    return (
        <div>
            <div id="navigation" className="text-center">
                <button data-testid="button-restart" className="small outlined" onClick={() => changeSlide(0)}>Restart</button>
                <button data-testid="button-prev" ref={prv} className="small" onClick={() => changeSlide(1)}>Prev</button>
                <button data-testid="button-next" ref={nxt} className="small" onClick={() => changeSlide(2)}>Next</button>
            </div>
            <div id="slide" className="card text-center">
                <h1 >{slides[state.count]['title']}</h1>
                <p >{slides[state.count]['text']}</p>
            </div>
        </div>
    );

}

export default Slides;
