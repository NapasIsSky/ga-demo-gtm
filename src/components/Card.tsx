import React from "react";
import styles from "@/styles/Card.module.css";
import { IProduct } from "@/interfaces";

interface ICard {
  key: string;
  product: IProduct;
  onClick: () => void;
}

const Card: React.FC<ICard> = (props) => {
  const { key, product, onClick } = props;

  return (
    <div key={key} id={product.id} onClick={onClick} className={styles.cardContainer}>
      <img src={product.picture} className={styles.cardPicture} />
      <div className={styles.cardContent}>
        <h2 className={styles.cardName}>{product.name}</h2>
        <p className={styles.cardDescription}>{product.description}</p>
        <h1 className={styles.cardPrice}>{`฿${product.price}`}</h1>
      </div>
    </div>
  );
};

export default Card;
