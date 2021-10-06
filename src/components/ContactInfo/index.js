import { Component, Fragment } from 'react';
import React from 'react';

import { Form, Button, Col, Row, ButtonGroup, ButtonToolbar, Card, Container } from 'react-bootstrap';
import Select from 'react-select';
import SweetAlert from 'react-bootstrap-sweetalert';
import validator from 'validator';
import { el } from 'date-fns/locale';

function getContactDetailsListFromLocalStorage() {
	let stringifiedContactDetailsList = localStorage.getItem('contactDetailsList');
	let parsedContactDetailsList = JSON.parse(stringifiedContactDetailsList);
	if (parsedContactDetailsList === null) {
		return [];
	} else {
		return parsedContactDetailsList;
	}
}

let contactDetailsList = getContactDetailsListFromLocalStorage();

const companyOptions = [
	{ value: 'End Customer', label: 'End Customer' },
	{ value: 'Channel Partner', label: 'Channel Partner' },
	{ value: 'Distributer', label: 'Distributer' }
];

const isRequired = (value) => value !== null && value !== '' && value;

function ContactInfo() {
	const [ companyType, onChangeCompanyType ] = React.useState('');
	const [ name, onChangeName ] = React.useState('');
	const [ designation, onChangeDesignation ] = React.useState('');
	const [ email, onChangeEmail ] = React.useState('');
	const [ email2, onChangeEmail2 ] = React.useState('');
	const [ phone1, onChangePhone1 ] = React.useState('');
	const [ phone2, onChangePhone2 ] = React.useState('');

	const [ typeRequiredState, setTypeRequiredState ] = React.useState(true);
	const [ nameRequiredState, setNameRequiredState ] = React.useState(true);
	const [ designationRequiredState, setDesignationRequiredState ] = React.useState(true);
	const [ emailRequiredState, setEmailRequiredState ] = React.useState(true);
	const [ phone1RequiredState, setPhone1RequiredState ] = React.useState(true);
	const [ phone2RequiredState, setPhone2RequiredState ] = React.useState(true);

	const [ nameError, setNameError ] = React.useState(null);
	const [ designationError, setdesignationError ] = React.useState(null);

	const [ emailError, setEmailError ] = React.useState(null);
	const [ email2Error, setEmail2Error ] = React.useState(null);

	const [ phone1Error, setPhone1Error ] = React.useState(null);
	const [ phone2Error, setPhone2Error ] = React.useState(null);

	const [ customerEmailExistsError, setCustomerEmailExistsError ] = React.useState(false);
	const [ customerNumberExistsError, setCustomerNumberExistsError ] = React.useState(false);

	const nameErrorTag = <small className="text-danger mt-2">* Please enter valid name </small>;
	const designationErrorTag = <small className="text-danger mt-2">* Please enter valid designation </small>;
	const emailErrorTag = <small className="text-danger mt-2">* Please enter valid email </small>;
	const phoneErrorTag = <small className="text-danger mt-2">* Please enter valid number </small>;

	const [ alertState, setAlertState ] = React.useState(false);

	const submitContactDetails = (event) => {
		event.preventDefault();
		if (companyType === '') {
			setTypeRequiredState(false);
		} else {
			setTypeRequiredState(true);
		}
		if (name === '') {
			setNameRequiredState(false);
		} else {
			setNameRequiredState(true);
		}
		if (designation === '') {
			setDesignationRequiredState(false);
		} else {
			setDesignationRequiredState(true);
		}
		if (email === '') {
			setEmailRequiredState(false);
		} else {
			setEmailRequiredState(true);
		}
		if (phone1 === '') {
			setCustomerNumberExistsError(false);
			setPhone1RequiredState(false);
		} else {
			setPhone1RequiredState(true);
		}

		if (companyType !== '' && name !== '' && designation !== '' && email !== '' && phone1 !== '') {
			setAlertState(true);
			const info = {
				name,
				designation,
				companyType: companyType.value,
				email,
				phone1,
				phone2,
				contactId: contactDetailsList.length
			};
			contactDetailsList.push(info);
			localStorage.setItem('contactDetailsList', JSON.stringify(contactDetailsList));
			onChangeName('');
			onChangeDesignation('');
			onChangeEmail('');
			onChangeCompanyType('');
			onChangePhone1('');
			onChangePhone2('');

			setDesignationRequiredState(true);
			setEmailRequiredState(true);
			setNameRequiredState(true);
			setTypeRequiredState(true);
			setPhone1RequiredState(true);
			setPhone2RequiredState(true);
			setCustomerEmailExistsError(false);
			setCustomerNumberExistsError(false);
		}
	};

	const onClickCancelButton = () => {
		onChangeName('');
		onChangeDesignation('');
		onChangeEmail('');
		onChangeCompanyType('');
		onChangePhone1('');
		onChangePhone2('');

		setDesignationRequiredState('');
		setEmailRequiredState('');
		setNameRequiredState('');
		setTypeRequiredState('');
		setPhone1RequiredState('');
		setPhone2RequiredState('');

		setCustomerEmailExistsError(false);
		setCustomerNumberExistsError(false);
	};

	const checkCustomerEmailExists = (event) => {
		if (contactDetailsList.length === 0) {
			setCustomerEmailExistsError(false);
		} else {
			for (let i = 0; i < contactDetailsList.length; i++) {
				if (contactDetailsList[i].email === event.target.value) {
					onChangeEmail('');

					setEmailRequiredState(true);
					setCustomerEmailExistsError(true);
					break;
				} else if (event.target.value === '') {
					setEmailRequiredState(false);
				} else {
					setCustomerEmailExistsError(false);
				}
			}
		}
	};

	const checkCustomerNumberExists = (event) => {
		if (contactDetailsList.length === 0) {
			setCustomerNumberExistsError(false);
		} else {
			for (let i = 0; i < contactDetailsList.length; i++) {
				if (contactDetailsList[i].phone1 === event.target.value) {
					onChangePhone1('');

					setPhone1RequiredState(true);
					setCustomerNumberExistsError(true);
					break;
				} else if (event.target.value === '') {
					setPhone1RequiredState(false);
				} else {
					setCustomerNumberExistsError(false);
				}
			}
		}
	};

	return (
		<Fragment>
			<Container fluid style={{ height: '70vh', marginTop: '100px' }}>
				<Row className="d-flex flex-column justify-content-center align-items-center ">
					<Col xs="12" xl="6">
						<Form className="form-horizontal">
							<Card className="horizontal-form">
								<Card.Header>
									<Card.Title as="h4" className="text-dark text-bold text-center mt-3 mb-3">
										Please provide Contact Details
									</Card.Title>
								</Card.Header>
								<Card.Body className="ml-5 mr-5">
									<Form.Group>
										<Row>
											<Col className="text-dark text-left" md="4">
												* Customer Type
											</Col>
											<Col md="8">
												<Select
													name="bootstrapSelect"
													options={companyOptions}
													value={companyType}
													onChange={(value) => {
														onChangeCompanyType(value);
														if (isRequired(value)) {
															setTypeRequiredState(true);
														} else {
															setTypeRequiredState(false);
														}
													}}
												/>
												{typeRequiredState ? null : (
													<label className="text-danger">This field is required.</label>
												)}
											</Col>
										</Row>
									</Form.Group>
									<Form.Group>
										<Row>
											<Col className="text-dark text-left" md="4">
												* Name:
											</Col>
											<Col md="8">
												<Form.Control
													type="text"
													placeholder="customer name"
													value={name}
													onChange={(e) => {
														onChangeName(e.target.value);
														if (validator.isAlpha(e.target.value, 'en-US', { ignore: ' ' }))
															setNameError(null);
														else setNameError(nameErrorTag);
														if (isRequired(e.target.value)) {
															setNameRequiredState(true);
														} else {
															setNameRequiredState(false);
														}
													}}
													onBlur={(e) => {
														if (e.target.value === '') {
															setNameRequiredState(false);
														}
													}}
												/>
												{nameError}
												{nameRequiredState ? null : (
													<label className="text-danger">This field is required.</label>
												)}
											</Col>
										</Row>
									</Form.Group>
									<Form.Group>
										<Row>
											<Col className="text-dark text-left" md="4">
												* Designation:
											</Col>
											<Col md="8">
												<Form.Control
													placeholder="Designation"
													value={designation}
													onChange={(e) => {
														onChangeDesignation(e.target.value);
														if (validator.isAlpha(e.target.value, 'en-US', { ignore: ' ' }))
															setdesignationError(null);
														else setdesignationError(designationErrorTag);
														if (isRequired(e.target.value)) {
															setDesignationRequiredState(true);
														} else {
															setDesignationRequiredState(false);
														}
													}}
													onBlur={(e) => {
														if (e.target.value === '') {
															setDesignationRequiredState(false);
														}
													}}
												/>
												{designationError}
												{designationRequiredState ? null : (
													<label className="text-danger">This field is required.</label>
												)}
											</Col>
										</Row>
									</Form.Group>
									<Form.Group>
										<Row>
											<Col className="text-dark text-left" md="4">
												* Email:
											</Col>
											<Col md="8">
												<Form.Control
													type="email"
													value={email}
													placeholder="example@gmail.com"
													onChange={(e) => {
														onChangeEmail(e.target.value);
														if (validator.isEmail(e.target.value)) {
															setEmailError(null);
														} else setEmailError(emailErrorTag);
														if (isRequired(e.target.value)) {
															setEmailRequiredState(true);
														} else {
															setEmailRequiredState(false);
														}
													}}
													onBlur={(e) => {
														checkCustomerEmailExists(e);
													}}
												/>
												{emailError}
												{!customerEmailExistsError ? null : (
													<label className="text-danger">This email already exists.</label>
												)}
												{emailRequiredState ? null : (
													<label className="text-danger">This field is required.</label>
												)}
											</Col>
										</Row>
									</Form.Group>
									<Form.Group>
										<Row>
											<Col className="text-dark text-left" md="4">
												   Alternate Email:
											</Col>
											<Col md="8">
												<Form.Control
													type="email"
													value={email2}
													placeholder="example@gmail.com"
													onChange={(e) => {
														onChangeEmail2(e.target.value);
														if (validator.isEmail(e.target.value)) {
															setEmail2Error(null);
														} else setEmail2Error(emailErrorTag);
													}}
												/>
												{email2Error}
											</Col>
										</Row>
									</Form.Group>
									<Form.Group>
										<Row>
											<Col className="text-dark text-left" md="4">
												* Phone Number:
											</Col>
											<Col md="8">
												<Form.Control
													placeholder="Phone Number"
													value={phone1}
													onChange={(e) => {
														onChangePhone1(e.target.value);
														if (validator.isMobilePhone(e.target.value))
															setPhone1Error(null);
														else setPhone1Error(phoneErrorTag);
														if (isRequired(e.target.value)) {
															setPhone1RequiredState(true);
														} else {
															setPhone1RequiredState(false);
														}
													}}
													onBlur={(e) => {
														checkCustomerNumberExists(e);
													}}
												/>
												{phone1Error}
												{!customerNumberExistsError ? null : (
													<label className="text-danger">
														This mobile number already exists.
													</label>
												)}
												{phone1RequiredState ? null : (
													<label className="text-danger">This field is required.</label>
												)}
											</Col>
										</Row>
									</Form.Group>
									<Form.Group>
										<Row>
											<Col className="text-dark text-left" md="4">
												Alternate Number:
											</Col>
											<Col md="8">
												<Form.Control
													placeholder="Phone Number"
													value={phone2}
													onChange={(e) => {
														onChangePhone2(e.target.value);
														if (validator.isMobilePhone(e.target.value))
															setPhone2Error(null);
														else setPhone2Error(phoneErrorTag);
													}}
												/>
												{phone2Error}
											</Col>
										</Row>
									</Form.Group>
								</Card.Body>
								<Card.Footer className="d-flex justify-content-end mr-5 mb-3">
									<Button
										className="btn-wd "
										type="button"
										variant="secondary"
										onClick={onClickCancelButton}
									>
										Cancel
									</Button>
									<Button
										className="btn-wd ml-3"
										type="button"
										variant="info"
										onClick={submitContactDetails}
									>
										Save
									</Button>
								</Card.Footer>

								{alertState ? (
									<SweetAlert
										success
										style={{ display: 'block', marginTop: '-100px' }}
										title=""
										onConfirm={() => setAlertState(false)}
										onCancel={() => setAlertState(false)}
										confirmBtnBsStyle="info"
									>
										You added new contact!
									</SweetAlert>
								) : null}
							</Card>
						</Form>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
}

export default ContactInfo;
