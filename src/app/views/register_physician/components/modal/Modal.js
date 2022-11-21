import React from "react";
import "./Modal.css";
import RegisterInstitution from "./../register_institution/index";

function Modal({ closeModal, getHealthUnits }) {
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__close-btn">
          <button
            onClick={closeModal}
          >
            X
          </button>
        </div>
        <div className="modal__title">
          <p>É obrigatório o vínculo com uma instituição já cadastrada no programa</p>
        </div>
        <div className="modal__body">
          <RegisterInstitution closeModal={closeModal} getHealthUnits={getHealthUnits} ></RegisterInstitution>
        </div>
      </div>
    </div>
  );
}

export default Modal;