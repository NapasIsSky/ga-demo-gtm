import React from "react";
import styles from "@/styles/Card.module.css";
import Card from "./Card";
import { IProduct } from "@/interfaces";

interface ICardList {
  productList: IProduct[];
}

const CardList: React.FC<ICardList> = (props) => {
  const { productList } = props;

  return (
    <div className={styles.cardListContainer}>
      {productList.map((product: IProduct, productIndex: number) => (
        <Card key={`${productIndex}-${product.id}`} product={product} onClick={() => {}} />
      ))}
    </div>
  );
};

export default CardList;
