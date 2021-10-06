import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import SweetAlert from 'react-bootstrap-sweetalert';

import { BiRefresh } from 'react-icons/bi';

import { useHistory } from 'react-router';
// react-bootstrap components
import {
	Badge,
	Button,
	Card,
	Form,
	InputGroup,
	Navbar,
	Nav,
	Table,
	Container,
	Row,
	Col,
	OverlayTrigger,
	Tooltip
} from 'react-bootstrap';

function getProductListFromLocalStorage() {
	let stringifieProductList = localStorage.getItem('selectedProductList');
	let parsedProductList = JSON.parse(stringifieProductList);
	if (parsedProductList === null) {
		return [];
	} else {
		return parsedProductList;
	}
}

let existingProductsList = getProductListFromLocalStorage();
existingProductsList.reverse();

console.log(existingProductsList[0].productSelectd[0]);

let a = Object.values(existingProductsList[0].productSelectd[0]);
console.log(a.join('- '));
let i = 0;
let k = 1;
function VisitOrder(props) {
	const [ alertState, setAlertState ] = React.useState(false);
	const history = useHistory();

	let count = true;

	useEffect(
		() => {
			let interval;
			if (props.location.refresh === true) {
				interval = setTimeout(() => {
					// The logic of changing counter value to come soon.
					window.location.reload(false);
				}, 1);
			} else {
				clearTimeout(interval);
			}
			return () => clearInterval(interval);
		},
		[ props.location.refresh ]
	);

	const getData = (eachList) => {
		let product = [];
		eachList.productSelectd.map((each) => {
			let a = Object.values(each).join(': ');
			product.push(a);
		});

		return (
			<tr key={eachList.id} className="text-center">
				<td>{existingProductsList.length - eachList.id}</td>
				<td>{eachList.date}</td>
				<td>{eachList.customerType}</td>
				<td>{eachList.customers.endCustomer}</td>
				<td>{eachList.customers.channelPartner}</td>
				<td>{eachList.customers.Distributer}</td>

				<td colSpan="2" className=" ml-auto">
					{product.map((each) => (
						<span key={(i++)+'a'} className="mb-1 mt-1">
							{each},<br />
						</span>
					))}
				</td>
			</tr>
		);
	};

	return (
		<Fragment>
			<Container fluid style={{ minHeight: '75vh', marginTop: '10px' }}>
				<Row>
					<Col>
						<h3 className="text-center text-bold mb-2">Existing Orders</h3>
					</Col>
					<Col md="12">
						<Card className="strpied-tabled-with-hover">
							<Card.Body className="table-responsive p-0">
								<Table bordered className="table-hover ">
									<tbody>
										<tr className="text-center text-dark bg-light ">
											<th className="">S.No</th>
											<th>Date</th>
											<th>Customer Type</th>
											<th>End Customer</th>
											<th>Channel Partner</th>
											<th>Distributer</th>
											<th colSpan="2">Products</th>
										</tr>
										{existingProductsList.map((eachList) => getData(eachList))}
									</tbody>
								</Table>
							</Card.Body>
							<Card.Footer className="text-right">
								<br />
								<Button
									className="btn-wd "
									type="button"
									variant="info"
									onClick={() => setAlertState(true)}
								>
									Add another Order
								</Button>
							</Card.Footer>
							{alertState ? (
								<SweetAlert
									success
									style={{ display: 'block', marginTop: '-100px' }}
									title="Do you want to add another Order?"
									onConfirm={() => setAlertState(false)}
									onCancel={() => setAlertState(false)}
									confirmBtnBsStyle="info"
									showConfirm={false}
									closeOnClickOutside={false}
								>
									<br />
									<br />
									<Button onClick={() => setAlertState(false)}>No</Button>
									<Link to="/admin/tabs">
										<Button>Yes</Button>
									</Link>
								</SweetAlert>
							) : null}
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
}

export default VisitOrder;
