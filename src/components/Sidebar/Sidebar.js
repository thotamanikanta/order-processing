import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

// react-bootstrap components
import {
	Badge,
	Button,
	ButtonGroup,
	Card,
	Collapse,
	Form,
	InputGroup,
	Navbar,
	Nav,
	Pagination,
	Container,
	Row,
	Col
} from 'react-bootstrap';

function Sidebar({ routes, image, background }) {
	// to check for active links and opened collapses
	let location = useLocation();
	// this is for the user collapse
	const [ userCollapseState, setUserCollapseState ] = React.useState(false);
	// this is for the rest of the collapses
	const [ state, setState ] = React.useState({});
	React.useEffect(() => {
		setState(getCollapseStates(routes));
	}, []);
	// this creates the intial state of this component based on the collapse routes
	// that it gets through routes prop
	const getCollapseStates = (routes) => {
		let initialState = {};
		routes.map((prop, key) => {
			if (prop.collapse) {
				initialState = {
					[prop.state]: getCollapseInitialState(prop.views),
					...getCollapseStates(prop.views),
					...initialState
				};
			}
			return null;
		});
		return initialState;
	};
	// this verifies if any of the collapses should be default opened on a rerender of this component
	// for example, on the refresh of the page,
	// while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
	const getCollapseInitialState = (routes) => {
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
				return true;
			} else if (location.pathname === routes[i].layout + routes[i].path) {
				return true;
			}
		}
		return false;
	};
	// this function creates the links and collapses that appear in the sidebar (left menu)
	const createLinks = (routes) => {
		return routes.map((prop, key) => {
			if (prop.redirect) {
				return null;
			}
			if (prop.collapse) {
				var st = {};
				st[prop['state']] = !state[prop.state];
				return (
					<Nav.Item className={getCollapseInitialState(prop.views) ? 'active' : ''} as="li" key={key}>
						<Nav.Link
							className={state[prop.state] ? 'collapsed' : ''}
							data-toggle="collapse"
							onClick={(e) => {
								e.preventDefault();
								setState({ ...state, ...st });
							}}
							aria-expanded={state[prop.state]}
						>
							<i className={prop.icon} />
							<p>
								{prop.name} <b className="caret" />
							</p>
						</Nav.Link>
						<Collapse in={state[prop.state]}>
							<div>
								<Nav as="ul">{createLinks(prop.views)}</Nav>
							</div>
						</Collapse>
					</Nav.Item>
				);
			}
			
			return (
				<Nav.Item className={activeRoute(prop.layout + prop.path)} key={key} as="li">
					<Nav.Link to={prop.layout + prop.path} as={Link}>
						{prop.icon ? (
							<Fragment>
								<i className={prop.icon} />
								<p>{prop.name}</p>
							</Fragment>
						) : (
							<Fragment>
								<span className="sidebar-mini">{prop.mini}</span>
								<span className="sidebar-normal">{prop.name}</span>
							</Fragment>
						)}
					</Nav.Link>
				</Nav.Item>
			);
		});
	};
	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName) => {
		return location.pathname === routeName ? 'active' : '';
	};
	return (
		<Fragment>
			<div className="sidebar" data-color={background} data-image={image} style={{}}>
				<div className="sidebar-wrapper">
					<div className="mb-5 ">
						<div className="logo-img">
							<img
								src="https://stackuptech.com/wp-content/uploads/2019/05/Stackup-tech-logo-header.png"
								alt="react-logo"
								style={({ height: '70px' }, { width: '200px' })}
								className="pt-3 pl-5 "
							/>
						</div>
					</div>

					<div className="user pt-3">
						<div className="photo">
							<img alt="..." src={require('/home/mani/order-processing/src/assets/img/faces/face-1.jpg').default} />
						</div>
						<div className="info">
							<a
								className={userCollapseState ? 'collapsed' : ''}
								data-toggle="collapse"
								href="#pablo"
								onClick={(e) => {
									e.preventDefault();
									setUserCollapseState(!userCollapseState);
								}}
								aria-expanded={userCollapseState}
							>
								<span>
									Abc <b className="caret" />
								</span>
							</a>
							<Collapse id="collapseExample" in={userCollapseState}>
								<div>
									<Nav as="ul">
										<li>
											<a
												className="profile-dropdown"
												href="#pablo"
												onClick={(e) => e.preventDefault()}
											>
												<span className="sidebar-mini">MP</span>
												<span className="sidebar-normal">My Profile</span>
											</a>
										</li>
										<li>
											<a
												className="profile-dropdown"
												href="#pablo"
												onClick={(e) => e.preventDefault()}
											>
												<span className="sidebar-mini">EP</span>
												<span className="sidebar-normal">Edit Profile</span>
											</a>
										</li>
										<li>
											<a
												className="profile-dropdown"
												href="#pablo"
												onClick={(e) => e.preventDefault()}
											>
												<span className="sidebar-mini">S</span>
												<span className="sidebar-normal">Settings</span>
											</a>
										</li>
									</Nav>
								</div>
							</Collapse>
						</div>
					</div>
					<Nav as="ul">{createLinks(routes)}</Nav>
				</div>
				<div
					className="sidebar-background"
					style={{
						backgroundImage: "url('" + image + "')"
					}}
				/>
			</div>
		</Fragment>
	);
}

let linkPropTypes = {
	path: PropTypes.string,
	layout: PropTypes.string,
	name: PropTypes.string,
	component: PropTypes.oneOfType([ PropTypes.func, PropTypes.element ])
};

Sidebar.defaultProps = {
	image: '',
	background: 'black',
	routes: []
};

Sidebar.propTypes = {
	image: PropTypes.string,
	background: PropTypes.oneOf([ 'black', 'azure', 'green', 'orange', 'red', 'purple' ]),
	routes: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.shape({
				...linkPropTypes,
				icon: PropTypes.string
			}),
			PropTypes.shape({
				collapse: true,
				path: PropTypes.string,
				name: PropTypes.string,
				state: PropTypes.string,
				icon: PropTypes.string,
				views: PropTypes.shape({
					...linkPropTypes,
					mini: PropTypes.string
				})
			})
		])
	)
};

export default Sidebar;
