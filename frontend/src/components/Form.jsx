import React, { useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Modal from "./Modal";

function Form({ fields, title, callback, isOpen, toggleModal }) {
  const [fieldsState, setFields] = useState(fields);
  debugger;
  function onSave() {
    debugger;
    let editedFields = _.difference(fieldsState, fields);
    debugger;
    let editedByKey = _.groupBy(editedFields, "key");
    debugger;
    editedByKey = _.transform(editedByKey, function (res, field, key) {
      debugger;
      res[key] = _.head(field).value;
    });
    debugger;
    if (title === "dish") {
      debugger;
      let form = new FormData();
      _.forEach(editedByKey, (value, key) => form.append(key, value));
      callback(form);
    } else {
      callback(editedByKey);
    }
  }

  function setField(key, value) {
    debugger;
    const currentField = _.find(fields, { key });
    debugger;
    const newField = _.assign({}, currentField, { value });
    debugger;
    const newFieldsState = _.map(fieldsState, (field) => {
      debugger;
      return field.key === key ? newField : field;
    });
    setFields(newFieldsState);
  }

  return (
    <Modal title={title} isOpen={isOpen} toggleModal={toggleModal}>
      {_.map(fieldsState, (field) => {
        let fieldKey = field.key;
        let onChange = (fieldKey, value) => setField(fieldKey, value);
        let fieldProps = {
          label: fieldKey,
          onChange,
          value: field.value,
        };
        return (
          <div className="form-field">
            {React.createElement(field.type, fieldProps)}
          </div>
        );
      })}
      <button onClick={onSave}>Send Form</button>
    </Modal>
  );
}

Form.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      type: PropTypes.element,
      value: PropTypes.any,
    })
  ),
  title: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default Form;
