import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import "./cartPanel.css";

const CartSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 -960 960 960"
    width="24px"
    fill="#000"
  >
    <path d="M292-120q-38 0-65-27.5T200-213v-371l-73-176H40v-80h141l66 160h591q23 0 35 19t1 39L760-399q51 8 85.5 47t34.5 92q0 58-40.5 99T741-120q-59 0-99.5-41T601-260q0-20 5-37t14-33l-131-12-120 180q-13 20-33.5 31T292-120Zm382-285 99-195H280l50 120q8 20 25.5 33.5T396-431l278 26ZM293-201q2 0 9-5l97-144q-49-5-77-23.5T280-412v200q0 5 4 8t9 3Zm447 1q26 0 43-17.5t17-42.5q0-26-17-43t-43-17q-25 0-42.5 17T680-260q0 25 17.5 42.5T740-200Zm-66-205-278-26 278 26Z" />
  </svg>
);

const ArrowSvg = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    {dir === "left" ? (
      <path d="M15 6l-6 6 6 6" stroke="currentColor" fill="#000" />
    ) : (
      <path d="M9 6l6 6-6 6" stroke="currentColor" fill="#000" />
    )}
  </svg>
);

export default function CartPanel() {
  const { items, remove, clear } = useCart();

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const [panelOpen, setPanelOpen] = useState(!isMobile);
  const [collapsed, setCollapsed] = useState(true);

  const [activeIdx, setActiveIdx] = useState(0);
  const [preview, setPreview] = useState(() => items[0] ?? null);

  useEffect(() => {
    if (!items.length) {
      setPreview(null);
      setActiveIdx(0);
    } else if (!preview) {
      setPreview(items[0]);
      setActiveIdx(0);
    }
  }, [items, preview]);

  const onHover = (item: (typeof items)[number], idx: number) => {
    setPreview(item);
    setActiveIdx(idx);
  };

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);

  const clearAll = () => {
    clear();
    setPreview(null);
  };

  const removeItem = (skuId: string) => {
    remove(skuId);
    if (preview?.skuId === skuId) setPreview(null);
  };

  const THUMB_H = 110;

  return (
    <>
      {isMobile && items.length > 0 && (
        <button
          className="cart-fab"
          onClick={() => setPanelOpen(true)}
          aria-label="Abrir carrito"
        >
          <CartSvg />
        </button>
      )}

      {!isMobile && items.length > 0 && (
        <aside
          className={`cart-panel desktop ${collapsed ? "collapsed" : "expanded"}`}
        >
          <button
            className="collapse-btn"
            onClick={() => setCollapsed((c) => !c)}
          >
            <ArrowSvg dir={collapsed ? "right" : "left"} />
          </button>

          {/* 👉 slider + preview + lista solo cuando está expandido */}
          {!collapsed && (
            <div className="cart-view">
              {/* ⑴ SLIDER de imágenes */}
              <div className="cart-slider">
                <div
                  className="slider-track"
                  style={{ transform: `translateY(-${activeIdx * THUMB_H}px)` }}
                >
                  {items.map((i) => (
                    <img
                      key={i.skuId}
                      src={i.image}
                      alt={i.name}
                      className="slider-img"
                    />
                  ))}
                </div>
              </div>

              {/* ⑵ PREVIEW “principal” */}
              <div className="cart-preview">
                {preview && <img src={preview.image} alt={preview.name} />}
              </div>

              {/* ⑶ LISTA con hover */}
              <div className="cart-info">
                <ul className="cart-list">
                  {items.map((i, idx) => (
                    <li
                      key={i.skuId}
                      className="cart-item"
                      onMouseEnter={() => onHover(i, idx)}
                    >
                      <img src={i.image} alt={i.name} />
                      <div className="cart-item-info">
                        <span>{i.name}</span>
                        <span>
                          {i.price.toLocaleString("es-CO", {
                            style: "currency",
                            currency: "COP",
                          })}
                        </span>
                      </div>
                      <span>×{i.qty}</span>
                      <button
                        className="cart-item-remove"
                        onClick={() => removeItem(i.skuId)}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="cart-actions">
                  <p>
                    Total:{" "}
                    {total.toLocaleString("es-CO", {
                      style: "currency",
                      currency: "COP",
                    })}
                  </p>
                  <button disabled={!items.length}>Finalizar compra</button>
                  <button onClick={clearAll} disabled={!items.length}>
                    Vaciar
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>
      )}

      {isMobile && items.length > 0 && (
        <aside className={`cart-panel mobile ${panelOpen ? "open" : ""}`}>
          <button
            className="close-btn"
            onClick={() => setPanelOpen(false)}
            aria-label="Cerrar carrito"
          >
            ×
          </button>

          {items.length === 0 ? (
            <p style={{ padding: "2rem" }}>Sin artículos</p>
          ) : (
            <>
              {!isMobile && (
                <div className="cart-preview">
                  {preview && <img src={preview.image} alt={preview.name} />}
                </div>
              )}

              <ul className="cart-list">
                {items.map((i) => (
                  <li
                    key={i.skuId}
                    className="cart-item"
                    onMouseEnter={() => setPreview(i)}
                  >
                    <img src={i.image} alt={i.name} />
                    <div className="cart-item-info">
                      <span>{i.name}</span>
                      <span>
                        {i.price.toLocaleString("es-CO", {
                          style: "currency",
                          currency: "COP",
                        })}
                      </span>
                    </div>
                    <span> X {i.qty} </span>
                    <button
                      className="cart-item-remove"
                      onClick={() => removeItem(i.skuId)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>

              <div className="cart-actions">
                <p>
                  Total:{" "}
                  {total.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })}
                </p>
                <button disabled={!items.length}>Finalizar compra</button>
                <button onClick={clearAll} disabled={!items.length}>
                  Vaciar
                </button>
              </div>
            </>
          )}
        </aside>
      )}
    </>
  );
}
