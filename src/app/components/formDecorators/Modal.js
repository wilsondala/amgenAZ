// @flow weak

import React, { PureComponent } from 'react';
import { Column, Grid } from './index';
import { coalesce } from '../../Utils';

export const ModalUtils = {

    showModal(selector, closeOthers = false) {
        UIkit.modal(
            selector,
            {
                keyboard: false,
                bgclose: false,
                center: true,
                modal: closeOthers
            }
        ).show();
    },

    hideModal(selector) {
        UIkit.modal(selector).hide();
    }
};

class Modal extends PureComponent {
    drawButton(button, col, cols) {
        return (
            <Column col={col} cols={cols} size="small" styleNames="uk-margin-botton" key={coalesce(button.id, button.description)}>
                <button
                    type={button.type ? button.type : 'button'}
                    onClick={button.onClick ? (button.fetch ? undefined : () => button.onClick()) : undefined}
                    disabled={button.fetch}
                    id={coalesce(button.id, button.description)}
                    className={button.class} >
                    {
                        button.fetch ?
                        <span><i className="fa fa-spinner fa-pulse fa-fw" />&nbsp;{button.descriptionFetch}...</span>
                        :
                        button.description
                    }
                </button>
            </Column>
        );
    }

    render() {
        const {
            id,
            header,
            body,
            buttons,
            sizeClass
        } = this.props;

        return (
            <div>
                <div id={id} className="uk-modal">
                    <div className={`uk-modal-dialog uk-modal-dialog-${sizeClass ? sizeClass : 'large'} uk-form`}>
                        <div className="uk-modal-header">
                            {header}
                            <hr/>
                        </div>
                        <div className="uk-form-row">
                            {body}
                        </div>
                        <div className="uk-modal-footer uk-text-right">
                            <Grid styleNames={"uk-width-1-1"}>
                                {
                                    buttons && buttons.map((button) => {
                                        return this.drawButton(button, 1, buttons.length)
                                    })
                                }
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

export default Modal;