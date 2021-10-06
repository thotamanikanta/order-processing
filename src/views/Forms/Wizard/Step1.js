import React, { Fragment } from 'react';
import { Row, Col, FormGroup, FormControl, FormLabel, FormCheck, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

const endCustomers = [
	'Edinbridge Skill Solutions Pvt Ltd',
	'Daily Thanthi',
	'Readylink',
	'Zero One Media',
	'Dinakaran',
	'Sans Pareil',
	'The Residency',
	'Kumudam',
	'Sushmaas Enterprises',
	'Cadgraf Digitals pvt ltd'
];
const distributers = endCustomers.concat();
const channelPartners = endCustomers.concat();

const Step1 = React.forwardRef((props, ref) => {
	const [ email, setEmail ] = React.useState('');
	const [ emailError, setEmailError ] = React.useState(null);
	const [ customerType, onClickCustomerType ] = React.useState('');
	const [ customerInput, onChangeInput ] = React.useState('');
	const [ channelInput, onChangeChannel ] = React.useState('');
	const [ distrubuterInput, onChangeDistributer ] = React.useState('');
	console.log(customerType);

	const renderCustomerDetails = (type, changeEvent) => {
		let customerDetails;
		let customer;
		let searchInput;
		if (type === 'direct') {
			customerDetails = endCustomers.concat();
			searchInput = customerInput;
			customer = 'End Customer';
		} else if (type === 'channel partner') {
			customerDetails = channelPartners.concat();
			searchInput = channelInput;
			customer = 'Channel Partner';
		} else if (type === 'distributer') {
			customerDetails = distributers.concat();
			searchInput = distrubuterInput;
			customer = 'Distributer';
		}
		return (
			<Form.Group as={Row} className="search-group mb-3" controlId="formPlaintextText">
				<Form.Label column sm="4">
					* {customer}:
				</Form.Label>
				<Col sm="8">
					<Typeahead
						allowNew
						id="basic-typeahead-single"
						labelKey="name"
						onChange={(event) => changeEvent(event)}
						options={customerDetails}
						selected={searchInput}
					/>
				</Col>
			</Form.Group>
		);
	};

	const selectCustomer = () => {
		switch (customerType) {
			case 'direct':
				return renderCustomerDetails('direct', onChangeInput);
			case 'channel partner':
				return (
					<Fragment>
						{renderCustomerDetails('direct', onChangeInput)}
						{renderCustomerDetails('channel partner', onChangeChannel)}
					</Fragment>
				);
			case 'distributer':
				return (
					<Fragment>
						{renderCustomerDetails('direct', onChangeInput)}
						{renderCustomerDetails('channel partner', onChangeChannel)}
						{renderCustomerDetails('distributer', onChangeDistributer)}
					</Fragment>
				);
			default:
				return null;
		}
	};

	return (
		<div className="wizard-step d-flex flex-column align-items-center" ref={ref}>
			<p className="">Please select the type of customer.</p>
			<Row className="">
				<Col md="12">
					<FormGroup className="">
						<FormCheck 
            className="text-black"
							type="radio"
							id="direct"
							label="Direct"
							name="order"
							onClick={(event) => onClickCustomerType(event.target.value)}
							value="direct"
						/>
					</FormGroup>
				</Col>
				<Col md="12">
					<FormGroup>
						<FormCheck
							type="radio"
							id="channelPartner"
							label="channel partner"
							name="order"
							onClick={(event) => onClickCustomerType(event.target.value)}
							value="channel partner"
						/>
					</FormGroup>
				</Col>
				<Col md="12">
					<FormGroup>
						<FormCheck
							type="radio"
							id="distributer"
							label="distributer"
							name="order"
							onClick={(event) => onClickCustomerType(event.target.value)}
							value="distributer"
						/>
					</FormGroup>
				</Col>
			</Row>
			<Row>
				<Col md={{ span: 10, offset: 1 }}>{selectCustomer()}</Col>
			</Row>
		</div>
	);
});

export default Step1;
