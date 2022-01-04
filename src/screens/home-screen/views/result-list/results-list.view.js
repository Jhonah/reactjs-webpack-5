import React, { useReducer, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import ResultDetail from "../result-detail/result-detail.view";
import "./results-list.view.scss";

const ResultList = ({ results }) => {
    const initialState = {
        from: 0, 
        to: 5, 
        toString() {
            return `from: ${this.from} to: ${this.to}`;
        } 
    };
    

    const [state, dispatch] = useReducer(reducer, initialState);

    function reducer (state, action) {
        const re = {from: state.from, to: state.to};

        if (state.to == 80 && action.type == 'increment') return re;
        if (state.from == 0 && action.type == 'decrement') return re;

        switch (action.type) {
            case 'increment':
                return {from: state.from + 5, to: state.to + 5};
            case 'decrement':
                return {from: state.from - 5, to: state.to - 5};
            default:
                throw new Error();
        }
    }

    const renderPerson = useCallback( (person) => {
        const ID = person.id;
        // within what limits to output
        if (!(ID >= state.from && ID < state.to)) return;

        return (
            // properties key -  avoiding slow work within browser
            <li key={ID}>
                <Link to='/about' 
                        className=""
                        // pass props throught state
                        state={{ from: person }}>
                    <ResultDetail result={person}/>
                </Link>
            </li>
    )}, [state]);

    return (
        <div className="result-list">
            {/* <h6> {state.from} </h6> */}
            <div className="result-list__border-line">
                <ul className="result-list__list">
                    <li className="result-list__item">Name</li>
                    <li className="result-list__item">Phone</li>
                    <li className="result-list__item">Company</li>
                    <li className="result-list__item">Country</li>
                </ul>
            </div>
            <ul>
                {results.map(renderPerson)}
            </ul>
            <button className="result-list__btn result-list__btn__gradient" onClick={()=> dispatch({type: 'decrement'})}>Назад</button>
            <button className="result-list__btn result-list__btn__gradient" onClick={()=> dispatch({type: 'increment'})}>Вперед</button>
        </div>
    );
};

export default ResultList;