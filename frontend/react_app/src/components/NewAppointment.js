import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import TriggerButton from './TriggerButton'; 
import { Modal } from './Modal';
import './scroll.css';


export class NewAppointmentFormContainer extends Component {
    state = { isShown: false }

    showModal = () => {
        this.setState({ isShown: true }, () => {
            this.closeButton.focus();
        });
        this.toggleScrollLock();
    };

    closeModal = () => {
        this.setState({ isShown: false });
        this.TriggerButton.focus();
        this.toggleScrollLock();
    };

    onKeyDown = (event) => {
        if (event.keyCode == 27) {
            this.closeModal();
        }
    };

    onClickOutside = (event) => {
        console.log(event)
        if (this.modal && this.modal.contains(event.target)) return;
        this.closeModal();
    }

    toggleScrollLock = () => {
        document.querySelector('html').classList.toggle('scroll-lock');
    };

    render() {
        return (
            <React.Fragment>
                <TriggerButton
                    showModal={this.showModal}
                    buttonRef={(n) => (this.TriggerButton = n)}
                    triggerText={this.props.triggerText}
                />

                {this.state.isShown ? (
                    <Modal
                        onSubmit={this.props.onSubmit}
                        modalRef={(n) => (this.modal = n)}
                        buttonRef={(n) => (this.closeButton = n)}
                        closeModal={this.closeModal}
                        onKeyDown={this.onKeyDown}
                        onClickOutside={this.onClickOutside}
                        />
                ) : null} 
            </React.Fragment>
        );
    }
}

export default NewAppointmentFormContainer;