import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "@/styles/Home.module.css";
import { ICart } from "@/interfaces";
import CloseIcon from "@/components/icons/CloseIcon";
import { AppContext } from "@/context";
import CreditCardIcon from "@/components/icons/CreditCardIcon";
import CashIcon from "@/components/icons/CashIcon";
import TagManager from "react-gtm-module";

export default function Home() {
  const appStore = React.useContext(AppContext);

  const router = useRouter();

  const [total, setTotal] = React.useState<number>(0);
  const [paymentMethod, setPaymentMethod] = React.useState<"card" | "cash">("card");

  const onPurchase = () => {
    const value: number =
      appStore?.cartList.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.product_detail.price * currentValue.quantity,
        0,
      ) || 0;

    const gtagItemsList: any[] = [];

    appStore?.cartList.forEach((item: ICart, index: number) => {
      gtagItemsList.push({
        item_id: item.product_detail.id,
        item_name: item.product_detail.name,
        index: index,
        price: item.product_detail.price,
        quantity: item.quantity,
      });
    });

    TagManager.dataLayer({
      dataLayer: {
        ecommerce: null,
      },
    });

    TagManager.dataLayer({
      dataLayer: {
        event: "purchase",
        ecommerce: {
          currency: "THB",
          transaction_id: `T_${Math.floor(Math.random() * 100)}`,
          value: value,
          tax: (value * 7) / 100,
          items: gtagItemsList,
        },
      },
    });
    router.push("/home");
    appStore?.setCartList([]);
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

  const tax: number = (total * 7) / 100;

  return (
    <React.Fragment>
      <Head>
        <title>{"PAYMENT|SHOPING"}</title>
      </Head>
      <div className={styles.paymentContainer}>
        <h1 className={styles.cartTitle}>PAYMENT</h1>
        <div
          onClick={() => {
            router.push("/cart");
          }}
          className={styles.closeBtn}
        >
          <CloseIcon className={styles.cartCloseIcon} />
        </div>

        <div className={styles.paymentSumContainer}>
          <div className={styles.paymentSumWrap}>
            <h3 className={styles.paymentNomalText}>Subtotal</h3>
            <h3 className={styles.paymentNomalText}>{`฿${total}`}</h3>
          </div>
          <div className={styles.paymentSumWrap}>
            <h3 className={styles.paymentNomalText}>Tax</h3>
            <h3 className={styles.paymentNomalText}>{`฿${tax}`}</h3>
          </div>
          <div className={styles.paymentSumWrap}>
            <h2 className={styles.totalPrice}>Total Price</h2>
            <h2 className={styles.totalPrice}>{`฿${total + tax}`}</h2>
          </div>
        </div>

        <div className={styles.paymentMethodContainer}>
          <h3 className={styles.paymentNomalText}>Choose Payment method: </h3>
          <div
            onClick={() => setPaymentMethod("card")}
            className={
              paymentMethod === "card" ? styles.activePaymentMethodBtn : styles.paymentMethodBtn
            }
          >
            <CreditCardIcon className={styles.creditCardIcon} />
          </div>
          <div
            onClick={() => setPaymentMethod("cash")}
            className={
              paymentMethod === "cash" ? styles.activePaymentMethodBtn : styles.paymentMethodBtn
            }
          >
            <CashIcon className={styles.cashIcon} />
          </div>
        </div>

        <button id="purchase-btn" onClick={onPurchase} className={styles.payBtn}>
          <h3>PURCHESE</h3>
        </button>
      </div>
    </React.Fragment>
  );
}
