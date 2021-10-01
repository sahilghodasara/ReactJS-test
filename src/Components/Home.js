import React, { useState } from 'react'
import '../App.css'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { EMPLOYEE_QUERY, ADD_EMPLOYEE, UPDATE_EMPLOYEE, DELETE_EMPLOYEE } from './Employee/index';
import { Table, Spinner, Container, Button } from 'react-bootstrap'
import { MDBIcon } from 'mdbreact'
import ModalComponent from './ModalComponent'

const ACTIONS = ['add', 'edit', 'delete'];

const Home = () => {
    const [show, setShow] = useState(false);
    const [action, setAction] = useState(ACTIONS[0]);
    const [employeeInfo, setEmployeeInfo] = useState();
    const { loading, error, data } = useQuery(EMPLOYEE_QUERY);
    const [addEmployee] = useMutation(ADD_EMPLOYEE, {
        refetchQueries: [{ query: EMPLOYEE_QUERY }],
    });
    const [editEmployee] = useMutation(UPDATE_EMPLOYEE, {
        refetchQueries: [{ query: EMPLOYEE_QUERY }],
    });
    const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
        refetchQueries: [{ query: EMPLOYEE_QUERY }],
    });

    const onAddEmployee = () => {
        setAction(ACTIONS[0])
        setShow(true)
    }
    const onEditEmployee = (employee) => {
        setAction(ACTIONS[1]);
        setShow(true);
        setEmployeeInfo(employee);
    }
    const onDeleteEmployee = (employee) => {
        setAction(ACTIONS[2]);
        setShow(true);
        setEmployeeInfo(employee);
    }
    const handleCloseModal = () => {
        setShow(false)
    }

    const onAdd = (newEmployee) => {
        if (action === ACTIONS[0]) {
            delete newEmployee.id;
            addEmployee({ variables: { ...newEmployee } })
        }
        if (action === ACTIONS[1]) {
            editEmployee({ variables: { ...newEmployee } })
        }
        if (action === ACTIONS[2]) {
            const id = (employeeInfo.id);
            deleteEmployee({ variables: { id } })
        }
        setShow(false);
    }

    const employee = data?.employeesList.items;
    if (loading) return <div className="loader"><Spinner animation="grow" /></div>
    if (error) return <div className="error">{error.message};</div>

    return (
        <Container style={{ marginTop: '10px' }}>
            <Button variant="success" style={{ float: 'right', margin: '20px', fontWeight: '700' }} onClick={onAddEmployee}>Add Employee</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee Name</th>
                        <th>Employee Email</th>
                        <th>Employee Mobile</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employee?.map(row => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.email}</td>
                                <td>{row.mobile}</td>
                                <td>
                                    <MDBIcon icon="pen" style={{ cursor: 'pointer' }} size="lg" className="amber-text pr-3" onClick={() => onEditEmployee(row)} />
                                    <MDBIcon style={{ cursor: 'pointer' }} icon="trash" size="lg" className="red-text pr-4" onClick={() => onDeleteEmployee(row)} />
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
            <ModalComponent showModal={show} closeModal={handleCloseModal} action={action} onSubmit={onAdd} employeeInfo={employeeInfo}></ModalComponent>
        </Container>
    );
}
export default Home;