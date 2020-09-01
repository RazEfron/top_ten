import React, { useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Modal from "./Modal";

function Form({
  fields,
  formInfo,
  callback,
  isOpen,
  toggleModal,
  title,
  onSucces
}) {
  const [fieldsState, setFields] = useState(fields);

  function onSave() {
    let editedFields = _.difference(fieldsState, fields);
    let editedByKey = _.groupBy(editedFields, "key");
    debugger;
    editedByKey = _.transform(editedByKey, function (res, field, key) {
      res[key] = _.head(field).value;
    });
      debugger;
      callback(editedByKey, formInfo, onSucces);
  }

  function setField(key, value) {
    debugger;
    const currentField = _.find(fields, { key });
    const newField = _.assign({}, currentField, { value });
    const newFieldsState = _.map(fieldsState, (field) => {
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
