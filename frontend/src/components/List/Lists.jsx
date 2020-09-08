import React from "react";
import ListItem from "./ListItem";
const _ = require("lodash");

function Lists({ lists, isAdmin, prepareForm, language }) {
  return (
    <div>
      {_.map(lists, (list) => {
        return (
          <ListItem
            list={list}
            isAdmin={isAdmin}
            prepareForm={prepareForm}
            language={language}
          />
        );
      })}
    </div>
  );
}

export default Lists;
