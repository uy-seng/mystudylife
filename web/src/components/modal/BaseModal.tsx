import React from "react";
import ReactDOM from "react-dom";
import css from "./BaseModal.module.css";
import { BaseModalProps, BaseModalSubcomponents } from "../types/modal";

const BaseModal: React.FC<BaseModalProps> & BaseModalSubcomponents = ({
  className,
  style,
  children,
  parent,
  show,
}) => {
  if (className) className += ` ${css.modal}`;
  else className = css.modal;

  if (show)
    return ReactDOM.createPortal(
      <React.Fragment>
        <div className={css.overlay} />
        <div className={className} style={style}>
          {children}
        </div>
      </React.Fragment>,
      parent
    );
  return null;
};

const Header: React.FC = ({ children }) => {
  return <div className={css.header}>{children}</div>;
};

const Title: React.FC = ({ children }) => {
  return <div className={css.title}>{children}</div>;
};

const Body: React.FC = ({ children }) => {
  return <div className={css.body}>{children}</div>;
};

const Extra: React.FC = ({ children }) => {
  return <div className={css.extra}>{children}</div>;
};

BaseModal.Header = Header;
BaseModal.Title = Title;
BaseModal.Body = Body;
BaseModal.Extra = Extra;

export default BaseModal;
