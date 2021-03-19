import { FC } from 'react';
import classes from './style.scss';
import avatar from './avatar.png';

const App: FC = () => {
	const test = 12345;

	return (
		<div
			data-testid="test"
			className={classes.someClassName}
		>
			Hello React `${test}`
			<img src={avatar} alt="Avatar" width="50" height="50"/>
		</div>
	);
};

export default App;
