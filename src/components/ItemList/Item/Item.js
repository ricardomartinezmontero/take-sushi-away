import React from 'react';

import classes from './Item.module.css';

const item = (props) => {
    return (
        <div className={classes.Item} onClick={() => props.itemClicked(props.name)}>
            <div className={classes.ImgContainer}>
                <img className={classes.Img} src={props.image} alt={props.name}/>
            </div>
            <div className={classes.ItemDetails}>
                <div>
                    <h2>{props.name}</h2>
                </div>
                <p>{props.description}</p>
                <span>{props.price} €</span>
            </div>
        </div>
    );
};

export default item;