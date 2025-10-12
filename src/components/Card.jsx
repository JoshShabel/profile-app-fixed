import PropTypes from 'prop-types';
import styles from '../styles/Card.module.css'

function Card({name, title, email, img}) {
{ // TODO: handle alt without creating a separate string beforehand?
    let altName = "Picture of " + {name};
    if (name !== undefined) {
        return (
            <div className={styles.cardOneStyle}>
                <img src={img} alt={altName} />
                <h2>{name}</h2>
                <h4>{email}</h4>
                <p>{title}</p>
            </div>
        )
    } else {
        return null;
    }


    }
}
Card.propTypes = {
        name: PropTypes.string,
        title: PropTypes.string,
        email: PropTypes.string,
        img: PropTypes.node,
}

export default Card;