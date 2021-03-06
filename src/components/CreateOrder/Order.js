import React, { Fragment } from 'react';
// react component used to create charts
import SweetAlert from 'react-bootstrap-sweetalert';
// react component that creates a form divided into multiple steps
import ReactWizard from 'react-bootstrap-wizard';
// react-bootstrap components
import { Link } from 'react-router-dom';

import {
	Badge,
	Button,
	Card,
	Form,
	InputGroup,
	Navbar,
	Nav,
	TabContent,
	TabPane,
	Container,
	Row,
	Col
} from 'react-bootstrap';
import { format } from 'date-fns';

import Product from './Product.js';
import ProductType from './ProductType.js';
import UploadDocument from './UploadDocument.js';

function getProductListFromLocalStorage() {
	let stringifieProductList = localStorage.getItem('selectedProductList');
	let parsedProductList = JSON.parse(stringifieProductList);
	if (parsedProductList === null) {
		return [];
	} else {
		return parsedProductList;
	}
}

let selectedProductList = getProductListFromLocalStorage();

let products = [];
let j=0
function Order(props) {
	const [ alertState, setAlertState ] = React.useState(false);

	const [ customerType, onClickCustomerType ] = React.useState('');
	const [ customerInput, onChangeInput ] = React.useState('');
	const [ channelInput, onChangeChannel ] = React.useState('');
	const [ distrubuterInput, onChangeDistributer ] = React.useState('');

	const [ productSelectd, onChangeProduct ] = React.useState({ 0: '' });
	const [ modelSelected, onChangeModel ] = React.useState({ 0: '' });

	const [ uploadedFile, onUploadFile ] = React.useState('');
	const [ isSubmitted, setIsSubmitted ] = React.useState(false);
	const steps = [
		{
			stepName: 'Order Type',
			component: ProductType,
			stepProps: {
				customerType,
				onClickCustomerType,
				customerInput,
				onChangeInput,
				channelInput,
				onChangeChannel,
				distrubuterInput,
				onChangeDistributer
			}
			
		},
		{
			stepName: 'Product',
			component: Product,
			stepProps: {
				productSelectd,
				onChangeProduct,
				modelSelected,
				onChangeModel
			}
		},
		{
			stepName: 'Upload Document',
			component: UploadDocument,
			stepProps: {
				uploadedFile,
				onUploadFile
			}
		}
	];

	let i = 1;
	let j=0
	

	const onCLickFInsih = () => {
		const curDate = format(new Date(), 'dd-MM-yyyy');

		for (let each in productSelectd) {
			let name = 'product' + i;
			//products[[ name ]] = productSelectd[each].value;
			products.push({
				product:productSelectd[each].value,
				model:modelSelected[each].value
			})
			i++;
		}
		
		let customers;
		if (customerType === 'Direct') {
			customers = { endCustomer: customerInput };
		}
		if (customerType === 'Channel Partner') {
			customers = { endCustomer: customerInput, channelPartner: channelInput };
		}
		if (customerType === 'Distributer') {
			customers = { endCustomer: customerInput, channelPartner: channelInput, Distributer: distrubuterInput };
		}
		selectedProductList.push({
			id: selectedProductList.length,
			customerType: customerType,
			customers: customers,
			productSelectd: products,
			fileUploaded: uploadedFile,
			date: curDate
		});
		localStorage.setItem('selectedProductList', JSON.stringify(selectedProductList));
		onClickCustomerType('');
		onChangeChannel('');
		onChangeDistributer('');
		onChangeInput('');
		onChangeProduct({ 0: '' });
		onUploadFile('');
		setIsSubmitted(true);
	};

	

	return (
		<Fragment>
			<Container fluid style={{ minHeight: '75vh', marginTop: '70px' }}>
				<Row>
					<Col className="m-auto " md="8" >
						<ReactWizard 
							steps={steps}
							navSteps
							title="Creating an Order"
							description=""
							headerTextCenter
							validate
							color="blue"
							previousButtonText="Back"
							nextButtonText="Next"
							finishButtonClasses="btn-info btn-wd"
							nextButtonClasses="btn-info btn-wd"
							previousButtonClasses="btn-wd"
							finishButtonClick={() => {
								onCLickFInsih();
								setAlertState(
									<SweetAlert
										success
										style={{ display: 'block', marginTop: '-100px' }}
										title="You Submitted the Order"
										onConfirm={() => setAlertState(false)}
										onCancel={() => setAlertState(false)}
										confirmBtnBsStyle="transparent"
										showConfirm={false}
                    closeOnClickOutside={false}
									>
										<h4></h4>
										<Link to={{pathname:"/admin/visitorder", refresh: true }}>
											<Button className=" " type="button" variant="info">
												OK
											</Button>
										</Link>
                    
										
									</SweetAlert>
								);
							}}
						/>
					</Col>
				</Row>
			</Container>
			{alertState}
		</Fragment>
	);
}

export default Order;
