import React from 'react';
import { Row, Col, FormGroup, FormControl, FormLabel, Form, Button } from 'react-bootstrap';
// react component that creates a dropdown menu for selection
import Select from 'react-select';
import { FiPlusCircle } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';

const productsList = [
	{ value: 'HCI', label: 'HCI' },
	{ value: 'Cloud', label: 'Cloud' },
	{ value: 'Storage', label: 'Storage' },
	{ value: 'ITAM', label: 'ITAM' },
	{ value: 'MiniPC', label: 'MiniPC' },
	{ value: 'Software', label: 'Software' },
	{ value: 'Services', label: 'Services' },
	{ value: 'AMC', label: 'AMC' },
	{ value: 'System Integration', label: 'System Integration' }
];

function getProductListFromLocalStorage() {
	let stringifiedProductList = localStorage.getItem('productList');
	let parsedProductList = JSON.parse(stringifiedProductList);
	if (parsedProductList === null) {
		return [];
	} else {
		return parsedProductList;
	}
}

let productList = getProductListFromLocalStorage();

const productNameList = productList.map((each) => ({
	value: each.productName,
	label: each.productName
}));

let nameList = [];

productNameList.map(x => nameList.filter(a => a.label == x.label ).length > 0 ? null : nameList.push(x));

let modelList=[]

let m=[]

let i = 0,
	j = 1;
let k = 1;
const Product = React.forwardRef((props, ref) => {
	const [ productCount, onClickAdd ] = React.useState([ 0 ]);
	const [ producterror, setProductError ] = React.useState({ 0: '' });

	const { productSelectd, onChangeProduct, modelSelected, onChangeModel } = props;

	const isValidated = () => {
		productCount.filter((each) => {
			if (productSelectd[each] === '') {
				setProductError({
					...producterror,
					[each]: <small className="text-danger">You have to select a product.</small>
				});
			}
		});
		var pe = true;
		let a = productCount.every((each) => productSelectd[each] !== '');
		return a;
	};
	React.useImperativeHandle(ref, () => ({
		isValidated: () => {
			return isValidated();
		}
	}));


	const getModelData=(each)=>{
		modelList=[]
		try {
			if(productSelectd[each]!==''){
			productList.filter(eachList=>{
				if(eachList.productName===productSelectd[each].value){
					modelList.push({
						value:eachList.model,
						label: eachList.model
					})
				}
			})
			return modelList
			}
		}
		catch (e){
			console.log('')
		}
		
		
		
	}

	return (
		<div className="wizard-step mr-auto">
			<h4 className="text-center text-bold mt-4">Please select the Products you want.</h4>

			<div key={i++} className="m-auto" styles={{ width: '50%' }}>
				<Row className=" mt-3 m-auto">
					<Col lg="10" className="m-auto">
						{productCount.map((each) => (
							<FormGroup>
								<Row className="mt-3">
									<Col className="text-dark text-left" lg="3">
										* Select Product
									</Col>

									<Col lg="4" className="mb-2">
										<Select
											id={each}
											name="bootstrapSelect"
											value={productSelectd[each]}
											options={nameList}
											onChange={(value) => {
												onChangeProduct({ ...productSelectd, [each]: value });
												setProductError({ ...producterror, [each]: '' });
											}}
										/>

										{producterror[each]}
									</Col>
									<Col lg="4"  className="mb-2">
										<Select
											id={each}
											name="bootstrapSelect"
											value={modelSelected[each]}
											options={getModelData(each)}
											
											onChange={(value) => {
												onChangeModel({ ...modelSelected, [each]: value });
												setProductError({ ...producterror, [each]: '' });
											}}
										/>

									</Col>
									<Col lg="1" className="mb-2">
										<button
											className="btn-simple btn btn-link text-right"
											onClick={() => {

												const index = productCount.indexOf(each);
												if (index !== 0) {
													delete productSelectd[each];
													onChangeProduct({ ...productSelectd });
													
													
													delete modelSelected[each];
													onChangeModel({...modelSelected})
													productCount.splice(index, 1);
													onClickAdd(productCount);
													delete producterror[each];
													setProductError({ ...producterror });
												}

											}}
										>
											<RiDeleteBinLine style={{ fontSize: '28px', color: '#d12a0b' }} />
										</button>
									</Col>
								</Row>
							</FormGroup>
						))}
					</Col>
					<Col lg="9" className="m-auto  d-flex justify-content-end">
						<button
							type="button"
							className="btn-simple btn btn-link text-right text-primary"
							onClick={(value) => {
								onClickAdd([ ...productCount, productCount[productCount.length - 1] + 1 ]);
								onChangeProduct({ ...productSelectd, [productCount[productCount.length - 1] + 1]: '' });
								
								
								setProductError({ ...producterror, [productCount[productCount.length - 1] + 1]: '' });
							}}
						>
							Add <FiPlusCircle className="plus text-primary" />
						</button>
					</Col>
				</Row>
			</div>
		</div>
	);
});

export default Product;
