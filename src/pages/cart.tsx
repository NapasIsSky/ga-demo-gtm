import React from "react";
import Head from "next/head";

import styles from "@/styles/Home.module.css";

import CloseIcon from "@/components/icons/CloseIcon";
import { AppContext } from "@/context";
import TagManager from "react-gtm-module";
import { useRouter } from "next/router";
import { ICart } from "@/interfaces";

export default function Home() {
  const appStore = React.useContext(AppContext);

  const router = useRouter();

  const [total, setTotal] = React.useState<number>(0);

  const onAddQuantity = (orderIndex: number) => {
    appStore?.setCartList((prevState: ICart[]) =>
      prevState.map((item: ICart, index: number) => {
        if (index === orderIndex) {
          TagManager.dataLayer({
            dataLayer: {
              ecommerce: null,
            },
          });

          TagManager.dataLayer({
            dataLayer: {
              event: "add_to_cart",
              ecommerce: {
                currency: "THB",
                value: item.product_detail.price,
                items: [
                  {
                    item_id: item.product_detail.id,
                    item_name: item.product_detail.name,
                    price: item.product_detail.price,
                    quantity: 1,
                  },
                ],
              },
            },
          });

          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      }),
    );
  };

  const onRemoveQuantity = (orderIndex: number) => {
    appStore?.setCartList((prevState: ICart[]) =>
      prevState.map((item: ICart, index: number) => {
        if (index === orderIndex && item.quantity > 1) {
          TagManager.dataLayer({
            dataLayer: {
              ecommerce: null,
            },
          });

          TagManager.dataLayer({
            dataLayer: {
              event: "remove_from_cart",
              ecommerce: {
                currency: "THB",
                value: item.product_detail.price,
                items: [
                  {
                    item_id: item.product_detail.id,
                    item_name: item.product_detail.name,
                    price: item.product_detail.price,
                    quantity: 1,
                  },
                ],
              },
            },
          });

          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      }),
    );
  };

  React.useEffect(() => {
    let result: number = 0;
    appStore?.cartList.forEach(
      (item: ICart) => (result = result + item.quantity * item.product_detail.price),
    );
    setTotal(result);
  }, [appStore?.cartList]);

  React.useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: "page_title",
        page_title: document.title,
      },
    });
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>{"CART|SHOPING"}</title>
      </Head>
      <div className={styles.checkOutContainer}>
        <h1 className={styles.cartTitle}>MY CART</h1>
        <div
          onClick={() => {
            router.push("/home");
          }}
          className={styles.closeBtn}
        >
          <CloseIcon className={styles.cartCloseIcon} />
        </div>

        <div className={styles.ordersContainer}>
          {appStore?.cartList.map((item: ICart, index: number) => (
            <div key={index}>
              <div className={styles.orderContainer}>
                <div className={styles.orderStartPart}>
                  <img src={item.product_detail.picture} className={styles.orderPicture} />
                  <h4 className={styles.orderName}>{item.product_detail.name}</h4>
                </div>
                <div className={styles.orderEndPart}>
                  <div
                    id="remove-from-cart-btn"
                    onClick={() => onRemoveQuantity(index)}
                    className={styles.removeQty}
                  >
                    -
                  </div>
                  <input type="text" value={item.quantity} readOnly className={styles.showQty} />
                  <div
                    id="add-to-cart-btn"
                    onClick={() => onAddQuantity(index)}
                    className={styles.addQty}
                  >
                    +
                  </div>
                </div>
              </div>
              {index !== appStore.cartList.length - 1 ? <div className={styles.divider} /> : null}
            </div>
          ))}
        </div>
        <h3 className={styles.total}>{`Total: ฿${total}`}</h3>
        <button
          onClick={() => {
            router.push("/payment");
          }}
          className={styles.checkOutBtn}
        >
          <h3>CHECK OUT</h3>
        </button>
      </div>
    </React.Fragment>
  );
}
