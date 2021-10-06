import { Component, Fragment, useState } from 'react';
import React from 'react';

import { Form, Button, Col, Row, ButtonGroup, ButtonToolbar, Card, Container } from 'react-bootstrap';
import Select from 'react-select';
import SweetAlert from 'react-bootstrap-sweetalert';
import validator from 'validator';

function getCompanyListFromLocalStorage() {
	let stringifiedCompanyList = localStorage.getItem('companyList');
	let parsedCompanyList = JSON.parse(stringifiedCompanyList);
	if (parsedCompanyList === null) {
		return [];
	} else {
		return parsedCompanyList;
	}
}

let companyList = getCompanyListFromLocalStorage();

const companyOptions = [
	{ value: 'End Customer', label: 'End Customer' },
	{ value: 'Channel Partner', label: 'Channel Partner' },
	{ value: 'Distributer', label: 'Distributer' }
];

const isRequired = (value) => value !== null && value !== '' && value;

function CompanyInfo() {
	const [ companyType, onChangeCompanyType ] = React.useState('');
	const [ name, onChangeName ] = React.useState('');
	const [ address, onChangeAddress ] = React.useState('');
	const [ city, onChangeCity ] = React.useState('');
	const [ pincode, onChangePincode ] = React.useState('');
	const [ gst, onChangeGST ] = React.useState('');

	const [ typeRequiredState, setTypeRequiredState ] = React.useState(true);
	const [ nameRequiredState, setNameRequiredState ] = React.useState(true);
	const [ addressRequiredState, setAddressRequiredState ] = React.useState(true);
	const [ cityRequiredState, setCityRequiredState ] = React.useState(true);
	const [ pincodeRequiredState, setPincodeRequiredState ] = React.useState(true);
	const [ gstRequiredState, setGstRequiredState ] = React.useState(true);
	const [ nameExistsError, setNameExistsError ] = React.useState(false);

	const [ alertState, setAlertState ] = React.useState(false);

	const [ disabled, setDisabled ] = useState(true);

	const [ nameError, setNameError ] = React.useState(null);
	const [ addressError, setAddressError ] = React.useState(null);

	const [ cityError, setCityError ] = React.useState(null);
	const [ pincodeError, setPincodeError ] = React.useState(null);

	const [ gstError, setGstError ] = React.useState(null);

	const nameErrorTag = <small className="text-danger mt-2">* Please enter valid company name </small>;
	const addressErrorTag = <small className="text-danger mt-2">* Please enter valid address </small>;
	const cityErrorTag = <small className="text-danger mt-2">* Please enter valid city </small>;
	const pincodeErrorTag = <small className="text-danger mt-2">* Please enter valid 6 digit pincode </small>;
	const gstErrorTag = <small className="text-danger mt-2">* Please enter valid GST No </small>;

	const validateGSTNumber = (value) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(value);

	let i;
	const submitCompanyDetails = (event) => {
		event.preventDefault();
		console.log('jhh')
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
		if (disabled === false) {
			if (city === '') {
				setCityRequiredState(false);
			} else {
				setCityRequiredState(true);
			}
			if (address === '') {
				setAddressRequiredState(false);
			} else {
				setAddressRequiredState(true);
			}
			if (pincode === '') {
				setPincodeRequiredState(false);
			} else {
				setPincodeRequiredState(true);
			}
			if (gst === '') {
				setGstRequiredState(false);
			} else {
				setGstRequiredState(true);
			}
		} else {
			setCityRequiredState(true);
			setAddressRequiredState(true);
			setPincodeRequiredState(true);
			setGstRequiredState(true);
		}
		
			if (
				companyType !== '' &&
				name !== '' &&
				address !== '' &&
				city !== '' &&
				pincode !== '' &&
				gst !== ''
			) {
				setAlertState(true);
				const info = {
					name,
					city,
					companyType: companyType,
					address,
					pincode,
					gst,
					companyId: companyList.length
				};
				companyList.push(info);
				localStorage.setItem('companyList', JSON.stringify(companyList));
				setDisabled(true);
				onChangeName('');
				onChangeAddress('');
				onChangeCity('');
				onChangeCompanyType('');
				onChangeGST('');
				onChangePincode('');

				setAddressRequiredState(true);
				setCityRequiredState(true);
				setNameRequiredState(true);
				setTypeRequiredState(true);
				setGstRequiredState(true);
				setPincodeRequiredState(true);
				setNameExistsError(false);
			}
		
		
	};

	const onClickCancelButton = () => {
		setDisabled(true);
		onChangeName('');
		onChangeAddress('');
		onChangeCity('');
		onChangeCompanyType('');
		onChangeGST('');
		onChangePincode('');

		setAddressRequiredState(true);
		setCityRequiredState(true);
		setNameRequiredState(true);
		setTypeRequiredState(true);
		setGstRequiredState(true);
		setPincodeRequiredState(true);
		setNameExistsError(false);
	};


	const checkCompanyNameExists=(event)=>{
		if (companyList.length === 0) {
			setDisabled(false);
			setNameExistsError(false);
		} else {
			for (i = 0; i < companyList.length; i++) {
				setCityRequiredState(true);
				setAddressRequiredState(true);
				setPincodeRequiredState(true);
				setGstRequiredState(true);
				if (name === '') {
					setDisabled(true);
					setNameRequiredState(false);
					setNameExistsError(false);
					onChangeName('');
					onChangeAddress('');
					onChangeCity('');
					onChangeGST('');
					onChangePincode('');
				} else if (companyList[i].name === name) {
					onChangeName('');
					onChangeAddress('');
					onChangeCity('');
					onChangeGST('');
					onChangePincode('');
					setDisabled(true);
					setNameRequiredState(true);
					setNameExistsError(true);
					break;
				} else {
					setDisabled(false);
					setNameExistsError(false);
				}
			}
		}

	}

	return (
		<Fragment>
			<Container fluid style={{ minHeight: '70vh', marginTop: '100px' }}>
				<Row className="d-flex flex-column justify-content-center align-items-center ">
					<Col xs="12" xl="6">
						<Form className="form-horizontal ">
							<Card className="horizontal-form">
								<Card.Header>
									<Card.Title as="h4" className="text-center text-dark mt-3 mb-3">
										Please provide Company Details
									</Card.Title>
								</Card.Header>
								<Card.Body className="ml-5 mr-5">
									<Form.Group>
										<Row>
											<Col className="text-dark text-left" md="4">
												* Company Type
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
												* Company Name:
											</Col>
											<Col md="8">
												<Form.Control
													type="text"
													placeholder="company name"
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
														checkCompanyNameExists(e);
													}}
												/>
												{nameError}
												{
													nameError!==null ? (
														nameRequiredState ? null : (
															<label className="text-danger">Please provide company name.</label>
														)
													) : null
												}
												{!nameExistsError ? null : (
													<label className="text-danger">This company already exists.</label>
												)}
												
											</Col>
										</Row>
									</Form.Group>
									<Form.Group>
										<Row>
											<Col className="text-dark text-left" md="4">
												* Company Address:
											</Col>
											<Col md="8">
												<Form.Control
													as="textarea"
													placeholder="company address"
													value={address}
													disabled={disabled}
													onChange={(e) => {
														onChangeAddress(e.target.value);
														if (
															validator.isAlphanumeric(e.target.value, 'en-US', {
																ignore: ' .,/:'
															})
														)
															setAddressError(null);
														else setAddressError(addressErrorTag);
														if (isRequired(e.target.value)) {
															setAddressRequiredState(true);
														} else {
															setAddressRequiredState(false);
														}
													}}
												/>
												{addressError}
												{addressRequiredState ? null : (
													<label className="text-danger">This field is required.</label>
												)}
											</Col>
										</Row>
									</Form.Group>
									<Form.Group>
										<Row>
											<Col className="text-dark text-left" md="4">
												* City:
											</Col>
											<Col md="8">
												<Form.Control
													placeholder="city"
													value={city}
													disabled={disabled}
													onChange={(e) => {
														onChangeCity(e.target.value);
														if (validator.isAlpha(e.target.value, 'en-US', { ignore: ' ' }))
															setCityError(null);
														else setCityError(cityErrorTag);
														if (isRequired(e.target.value)) {
															setCityRequiredState(true);
														} else {
															setCityRequiredState(false);
														}
													}}
												/>
												{cityError}
												{cityRequiredState ? null : (
													<label className="text-danger">This field is required.</label>
												)}
											</Col>
										</Row>
									</Form.Group>
									<Form.Group>
										<Row>
											<Col className="text-dark text-left" md="4">
												* Pincode:
											</Col>
											<Col md="8">
												<Form.Control
													placeholder="pincode"
													value={pincode}
													disabled={disabled}
													onChange={(e) => {
														onChangePincode(e.target.value);

														if (
															validator.isNumeric(e.target.value) &&
															e.target.value.length === 6
														)
															setPincodeError(null);
														else setPincodeError(pincodeErrorTag);
														if (isRequired(e.target.value)) {
															setPincodeRequiredState(true);
														} else {
															setPincodeRequiredState(false);
														}
													}}
												/>
												{pincodeError}
												{pincodeRequiredState ? null : (
													<label className="text-danger">This field is required.</label>
												)}
											</Col>
										</Row>
									</Form.Group>
									<Form.Group>
										<Row>
											<Col className="text-dark text-left" md="4">
												* GST No:
											</Col>
											<Col md="8">
												<Form.Control
													value={gst}
													placeholder="gst number"
													disabled={disabled}
													onChange={(e) => {
														onChangeGST(e.target.value);
														if (validateGSTNumber(e.target.value)) setGstError(null);
														else setGstError(gstErrorTag);
														if (isRequired(e.target.value)) {
															setGstRequiredState(true);
														} else {
															setGstRequiredState(false);
														}
													}}
												/>
												{gstError}
												{gstRequiredState ? null : (
													<label className="text-danger">This field is required.</label>
												)}
											</Col>
										</Row>
									</Form.Group>
								</Card.Body>
								<Card.Footer className="d-flex justify-content-end mb-3 mr-5">
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
										onClick={submitCompanyDetails}
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
										You added new comapny!
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

export default CompanyInfo;
