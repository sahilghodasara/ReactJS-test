import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Col, Row } from 'react-bootstrap'

const ACTIONS = ['add', 'edit', 'delete'];

const ModalComponent = ({ showModal, closeModal = () => { }, action, onSubmit = () => { }, employeeInfo }) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    const isAdd = action === ACTIONS[0];
    const isEdit = action === ACTIONS[1];
    const isDelete = action === ACTIONS[2];

    useEffect(() => {
        if (showModal) {
            setShow(true);
        }else{
            setShow(false)
        }
    }, [showModal])

    useEffect(() => {
        if (action === ACTIONS[0]) {
            setName('');
            setEmail('');
            setMobile('');
        } else {
            setName(employeeInfo?.name)
            setEmail(employeeInfo?.email)
            setMobile(employeeInfo?.mobile)
        }
    }, [action, employeeInfo])

    const handleClose = () => { setShow(false); closeModal() };

    const handleSubmit = () => {
        const data = {
            id: employeeInfo?.id,
            name: name,
            email: email,
            mobile: mobile
        }
        onSubmit(data)
    }
    const onNameChange = ({ target }) => {
        setName(target.value)
    }
    const onEmailChange = ({ target }) => {
        setEmail(target.value)
    }
    const onMobileChange = ({ target }) => {
        setMobile(target.value)
    }
    const renderTitle = (
        <div>
            {isAdd && "Add Employee"}
            {isEdit && "Edit Employee"}
            {isDelete && "Delete Employee"}
        </div>
    )

    const renderAddEditEmployee = (
        <div>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
                    <Form.Label column sm="2">
                        Name
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Example: John Brown" value={name} onChange={onNameChange} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" placeholder="email@example.com" value={email} onChange={onEmailChange} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextMobile">
                    <Form.Label column sm="2">
                        Mobile
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder="Example: 1234567890" value={mobile} onChange={onMobileChange} />
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
    const renderDeleteEmployee = (
        <label>Are you sure you want to permanently delete this employee?</label>
    )
    const renderBody = (
        <div>
            {isDelete ? renderDeleteEmployee :
                renderAddEditEmployee}
        </div>
    )
    const renderFooter = (
        <div>
            <Button variant="warning" onClick={handleClose}>
                Close
            </Button>
            <Button variant="success" onClick={handleSubmit}>
                {isAdd && "Add"}
                {isEdit && "Save"}
                {isDelete && "Delete"}
            </Button>
        </div>
    )
    const renderModal = (
        <div>
            <Modal.Header closeButton>
                <Modal.Title>{renderTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {renderBody}
            </Modal.Body>
            <Modal.Footer>
                {renderFooter}
            </Modal.Footer>
        </div>

    )

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                {renderModal}
            </Modal>
        </>
    );
}

export default ModalComponent;