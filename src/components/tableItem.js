import React from "react";

const TableItem = (props) => {

    return (
    <div className="tableItem">
        <img src={props.thumb.default.url} loading="lazy" alt="tableItem"></img>
        <div className="tableItem__info">
        <span className="tableItem__title">{props.title}</span>
        <span className="tableItem__disc">{props.author}</span>
        <span>3:01</span>
        </div>
    </div>
  );
};

export default TableItem;
