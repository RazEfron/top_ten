import React from "react";
import BranchItem from "./BranchItem";
const _ = require("lodash");

function Branches({ branches, isAdmin, prepareForm, language }) {
  return (
    <div>
      {_.map(branches, (branch) => {
        return (
          <BranchItem
            branch={branch}
            isAdmin={isAdmin}
            prepareForm={prepareForm}
            language={language}
          />
        );
      })}
    </div>
  );
}

export default Branches;
