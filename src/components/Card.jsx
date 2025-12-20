import PropTypes from 'prop-types';
import styles from '../styles/Card.module.css'
import {memo, useLayoutEffect, useRef, useState} from "react";


const Card = memo(({name, title, email, img, textFilter, job }) => {
    const heightRef = useRef(null);
    const [height, setHeight] = useState("230px");

    useLayoutEffect(() => {

        if (heightRef.current === null)
            return

        const domHeight = heightRef.current.getBoundingClientRect().height;

        if (domHeight > 24){
            setHeight(`${230 + (domHeight - 24)}px`);
        }

    }, []);

    { // TODO: handle alt without creating a separate string beforehand?
        let altName = "Picture of " + {name};
        if ((name !== undefined) && name.toLowerCase().includes(textFilter.toLowerCase()) && (job === title || job === "None Chosen")) {
            return (
                <div  style={{ height: height }} className={styles.cardOneStyle}>
                    <img  src={img} alt={altName} />
                    <h2>{name}</h2>
                    <h4>{email}</h4>
                    <p ref={heightRef} >{title}</p>
                </div>
            )
        } else {
            return null;
        }


    }
});

Card.propTypes = {
        name: PropTypes.string,
        title: PropTypes.string,
        email: PropTypes.string,
        img: PropTypes.node,
}

export default Card;