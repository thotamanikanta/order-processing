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

const ProductType = React.forwardRef((props, ref) => {
	const [ customerTypeError, setTypeError ] = React.useState(null);
	const [ customerInputError, setCustomerInputError ] = React.useState(null);
	const [ channelInputError, setChannelInputError ] = React.useState(null);
	const [ DistributerInputError, setDistributerInputError ] = React.useState(null);

	const [ customerCurrentError, setCustomerCurrentError ] = React.useState(null);
	const [ channelCurrentError, setChannelCurrentError ] = React.useState(null);
	const [ DistributerCurrentError, setDistributerCurrentError ] = React.useState(null);

	const [ customerEmpty, isCustomerEmpty ] = React.useState(false);

	const {
		customerType,
		onClickCustomerType,
		customerInput,
		onChangeInput,
		onChangeChannel,
		channelInput,
		distrubuterInput,
		onChangeDistributer,
		isChecked,
		setIsChecked
	} = props;

	const isValidated = () => {
		customerType === ''
			? setTypeError(<small className="text-danger mt-2">* You have to select a customer type.</small>)
			: setTypeError(null);
		let typeError = customerType !== '';
		let customerError = true;
		if (customerType === 'Direct') {
			customerInput === ''
				? setCustomerInputError(
						<small className="text-danger text-center mb-3">* You have to select an end customer .</small>
					)
				: setCustomerInputError(null);

			if (customerInput === '') {
				customerError = false;
			}
		}
		if (customerType === 'Channel Partner') {
			customerInput === ''
				? setCustomerInputError(
						<small className="text-danger text-center ">* You have to select an end customer .</small>
					)
				: setCustomerInputError(null);
			channelInput === ''
				? setChannelInputError(
						<small className="text-danger text-right">* You have to select a Channel Partner.</small>
					)
				: setChannelInputError(null);

			if (customerInput === '' || channelInput === '') {
				customerError = false;
			}
		}
		if (customerType === 'Distributer') {
			customerInput === ''
				? setCustomerInputError(
						<small className="text-danger  text-center">* You have to select an end customer .</small>
					)
				: setCustomerInputError(null);
			channelInput === ''
				? setChannelInputError(
						<small className="text-danger text-right">* You have to select a Channel Partner.</small>
					)
				: setChannelInputError(null);
			distrubuterInput === ''
				? setDistributerInputError(
						<small className="text-danger text-right">* You have to select a Distributer.</small>
					)
				: setDistributerInputError(null);

			if (customerInput === '' || channelInput === '' || distrubuterInput === '') {
				customerError = false;
			}
		}
		let curError =
			customerCurrentError === null && channelCurrentError === null && DistributerCurrentError === null;
		let inputError =!customerEmpty 
		console.log(inputError,'skahdh')
		let valid = typeError && customerError && curError ;
		return valid;
	};
	React.useImperativeHandle(ref, () => ({
		isValidated: () => {
			return isValidated();
		}
	}));
	console.log('??????????',customerInputError,channelInputError,DistributerInputError)
	const onCustomerKeyEnter = (value) => {
		const newCustomerList = endCustomers.filter((each) => each.toLowerCase().includes(value.toLowerCase()));
		if (value === '') {
			
			setCustomerInputError(<small className="text-danger mt-2">* You have to select a End Customer </small>);
			console.log(value,'+_+_+_+_',customerInputError)
			isCustomerEmpty(true)
		} else {
			setCustomerInputError(null)
			isCustomerEmpty(false)
		}
		if (newCustomerList.length === 0) {
			setCustomerCurrentError(
				<small className="text-danger text-right">* Please select from exixting customer list.</small>
			);
		} else {
			setCustomerCurrentError(null);
		}
	};

	const onChannelKeyEnter = (value) => {
		const newCustomerList = channelPartners.filter((each) => each.toLowerCase().includes(value.toLowerCase()));
		if (value === '') {
			setChannelInputError(<small className="text-danger mt-2">* You have to select a Channel Partner </small>);
		} else setChannelInputError(null);
		if (newCustomerList.length === 0) {
			setChannelCurrentError(
				<small className="text-danger text-right">* Please select from exixting Channel Partner list.</small>
			);
		} else {
			setChannelCurrentError(null);
		}
	};

	const onDistributerKeyEnter = (value) => {
		const newCustomerList = distributers.filter((each) => each.toLowerCase().includes(value.toLowerCase()));
		if (value === '') {
			setDistributerInputError(
				<small className="text-danger mt-2">* You have to select a Channel Partner </small>
			);
		} else setDistributerInputError(null);
		if (newCustomerList.length === 0) {
			setDistributerCurrentError(
				<small className="text-danger text-right">* Please select from exixting ditributers list.</small>
			);
		} else {
			setDistributerCurrentError(null);
		}
	};

	const renderEndCustomerDetails = () => {
		return (
			<Form.Group as={Row} className="search-group mt-3" controlId="formPlaintextText">
				<Col className="text-dark text-left" md="6">
					* End Customer
				</Col>
				<Col sm="12">
					<Typeahead
						id="basic-typeahead-single"
						labelKey="name"
						onChange={(event) => {
							onChangeInput(event);
						}}
						onInputChange={(value) => {
							setCustomerInputError(null);
							onCustomerKeyEnter(value);
						}}
						options={endCustomers}
						
					/>
				</Col>
			</Form.Group>
		);
	};

	const renderChannelPartnerDetails = () => {
		return (
			<Form.Group as={Row} className="search-group mt-3" controlId="formPlaintextText">
				<Col className="text-dark text-left" md="6">
					* Channel Partner
				</Col>
				<Col sm="12">
					<Typeahead
						id="basic-typeahead-single"
						labelKey="name"
						onChange={(event) => {
							onChangeChannel(event);
						}}
						onInputChange={(value) => {
							onChannelKeyEnter(value);
							setChannelInputError(null);
						}}
						options={channelPartners}
						
					/>
				</Col>
			</Form.Group>
		);
	};

	const renderDistributerDetails = () => {
		return (
			<Form.Group as={Row} className="search-group mt-3" controlId="formPlaintextText">
				<Col className="text-dark text-left" md="6">
					* Distributer
				</Col>
				<Col md="12">
					<Typeahead
						id="basic-typeahead-single"
						labelKey="name"
						onChange={(event) => {
							onChangeDistributer(event);
						}}
						onInputChange={(value) => {
							onDistributerKeyEnter(value);
							setDistributerInputError(null)
						}}
						options={distributers}
						
					/>
				</Col>
			</Form.Group>
		);
	};

	const selectCustomer = () => {
		switch (customerType) {
			case 'Direct':
				return (
					<Fragment>
						{renderEndCustomerDetails()}
						{customerCurrentError}
						{customerInputError}
					</Fragment>
				);

			case 'Channel Partner':
				return (
					<Fragment>
						{renderEndCustomerDetails()}
						{customerCurrentError}
						{customerInputError}
						{renderChannelPartnerDetails()}
						{channelCurrentError}
						{channelInputError}
					</Fragment>
				);
			case 'Distributer':
				return (
					<Fragment>
						{renderEndCustomerDetails()}
						{customerCurrentError}
						{customerInputError}
						{renderChannelPartnerDetails()}
						{channelCurrentError}
						{channelInputError}
						{renderDistributerDetails()}
						{DistributerCurrentError}
						{DistributerInputError}
					</Fragment>
				);
			default:
				return null;
		}
	};

	return (
		<div className="wizard-step d-flex flex-column align-items-center" ref={ref}>
			<h4 className="text-center text-bold mb-5" >Please select the type of customer and customers.</h4>
			<Row className="">
				<Col md="12" className="d-flex flex-column justify-content-center">
					<Form.Group>
						<Form.Check type="radio" id="direct" name="order">
							<Form.Check.Input
								type="radio"
								value="Direct"
								name="order"
								onClick={(event) => {
									onClickCustomerType(event.target.value);
									setTypeError(null);
								}}
							/>
							<Form.Check.Label className="text-dark" style={{ fontSize: '1rem' }}>
								Direct
							</Form.Check.Label>
						</Form.Check>
						<Form.Check type="radio" id="channelPartner" name="order">
							<Form.Check.Input
								type="radio"
								value="Channel Partner"
								onClick={(event) => {
									onClickCustomerType(event.target.value);
									setTypeError(null);
								}}
								name="order"
							/>
							<Form.Check.Label className="text-dark" style={{ fontSize: '1rem' }}>
								Channel Partner
							</Form.Check.Label>
						</Form.Check>
						<Form.Check type="radio" id="Distributer" name="order">
							<Form.Check.Input
								type="radio"
								value="Distributer"
								name="order"
								onClick={(event) => {
									onClickCustomerType(event.target.value);
									setTypeError(null);
								}}
							/>
							<Form.Check.Label className="text-dark" style={{ fontSize: '1rem' }}>
								Distributer
							</Form.Check.Label>
						</Form.Check>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md="12">{customerTypeError}</Col>
			</Row>
			<Row>
				<Col md={{ span: 10, offset: 1 }}>{selectCustomer()}</Col>
			</Row>
		</div>
	);
});

export default ProductType;
