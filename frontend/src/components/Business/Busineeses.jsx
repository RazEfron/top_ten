import React from "react";
import BusinessItem from "./BusinessItem";
const _ = require("lodash")

function Businesses({ businesses, isAdmin, prepareForm, language }) {
  return (
    <div>
      {_.map(businesses, (business) => {
        return (
          <BusinessItem
            business={business}
            isAdmin={isAdmin}
            prepareForm={prepareForm}
            language={language}
          />
        );
      })}
    </div>
  );
}

export default Businesses;
